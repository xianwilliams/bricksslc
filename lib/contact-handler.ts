import { createHash } from 'node:crypto';
import { inquirySchema, inquiryText } from './inquiry.ts';
import { site } from './site.ts';
type DeliveryConfig = { apiKey?: string; from?: string };
type HandlerOptions = { config: DeliveryConfig; fetcher?: typeof fetch; now?: () => number };
/** Bounded single-process backstop. Use the deployment's shared rate limit for multiple instances. */
export function createContactHandler({ config, fetcher = fetch, now = Date.now }: HandlerOptions) {
  const attempts = new Map<string, { count: number; expires: number }>();
  return async function handle(request: Request) {
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin)
      return Response.json(
        { error: 'This inquiry must be sent from the BRICKS website.' },
        { status: 403 },
      );
    if (!request.headers.get('content-type')?.startsWith('application/json'))
      return Response.json(
        {
          error:
            'Please prepare your inquiry using the website form, or email brett@bricksslc.com.',
        },
        { status: 415 },
      );
    if (Number(request.headers.get('content-length') || 0) > 16000)
      return Response.json({ error: 'The inquiry is too long.' }, { status: 413 });
    let raw: unknown;
    try {
      const text = await request.text();
      if (new TextEncoder().encode(text).length > 16000)
        return Response.json({ error: 'The inquiry is too long.' }, { status: 413 });
      raw = JSON.parse(text);
    } catch {
      return Response.json({ error: 'Please check your inquiry and try again.' }, { status: 400 });
    }
    const parsed = inquirySchema.safeParse(raw);
    if (!parsed.success)
      return Response.json({ error: parsed.error.issues[0].message }, { status: 400 });
    if (!config.apiKey || !config.from)
      return Response.json(
        {
          error:
            'Direct delivery is not connected. You can send your prepared inquiry from your email app.',
        },
        { status: 503 },
      );
    const time = now();
    for (const [id, entry] of attempts) {
      if (entry.expires <= time) attempts.delete(id);
    }
    const id = createHash('sha256').update(parsed.data.email.toLowerCase()).digest('hex');
    const entry = attempts.get(id) || { count: 0, expires: time + 600000 };
    if (entry.count >= 3 || (!attempts.has(id) && attempts.size >= 1000))
      return Response.json(
        { error: 'Please wait before trying again, or send your inquiry from your email app.' },
        { status: 429, headers: { 'Retry-After': '600' } },
      );
    entry.count++;
    attempts.set(id, entry);
    try {
      const result = await fetcher('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: config.from,
          to: site.email,
          reply_to: parsed.data.email,
          subject: `BRICKS: ${parsed.data.interest}`,
          text: inquiryText(parsed.data),
        }),
        signal: AbortSignal.timeout(12000),
      });
      if (!result.ok)
        return Response.json(
          {
            error:
              'The email service couldn’t deliver this inquiry. Please try your email app below.',
          },
          { status: 502 },
        );
      return Response.json({ sent: true });
    } catch {
      return Response.json(
        { error: 'The connection timed out. Please try your email app below.' },
        { status: 502 },
      );
    }
  };
}
