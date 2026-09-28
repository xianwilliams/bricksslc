'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft, Check, Copy } from 'lucide-react';
import { interests, inquirySchema, inquiryMailto, inquiryText, type Inquiry } from '@/lib/inquiry';
export function InquiryForm({
  initialInterest = 'General inquiry',
  directDelivery = false,
}: {
  initialInterest?: string;
  directDelivery?: boolean;
}) {
  const [interest, setInterest] = useState(
    interests.includes(initialInterest as (typeof interests)[number])
      ? initialInterest
      : 'General inquiry',
  );
  const [prepared, setPrepared] = useState<Inquiry | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const review = useRef<HTMLDivElement>(null);
  const prepare = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const values = Object.fromEntries(f);
    const result = inquirySchema.safeParse({ ...values, consent: f.get('consent') === 'on' });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setPrepared(result.data);
    setError('');
    requestAnimationFrame(() => review.current?.focus());
  };
  const send = async () => {
    if (!prepared || busy) return;
    setBusy(true);
    setError('');
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prepared),
      });
      const result = await r.json();
      if (!r.ok) throw new Error(result.error || 'We couldn’t deliver your inquiry.');
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Please try your email app.');
    } finally {
      setBusy(false);
    }
  };
  if (sent)
    return (
      <div className="form-result" role="status">
        <Check size={36} />
        <h2>
          You’re
          <br />
          on our radar.
        </h2>
        <p>
          Your inquiry has been delivered to the BRICKS team at brett@bricksslc.com. They’ll be in
          touch.
        </p>
        <Link href="/" className="arrow-link">
          Back to the house <ArrowUpRight size={18} />
        </Link>
      </div>
    );
  return (
    <>
      <form
        method="post"
        action="/api/contact"
        onSubmit={prepare}
        className="inquiry-form"
        style={{ display: prepared ? 'none' : undefined }}
      >
        <div className="form-intro">
          <span className="micro">Your next chapter starts here.</span>
          <p>Tell us a little about yourself.</p>
        </div>
        <div className="form-grid">
          <label>
            First name <span>*</span>
            <input
              name="firstName"
              autoComplete="given-name"
              required
              maxLength={80}
              placeholder="Your first name"
            />
          </label>
          <label>
            Last name <span>*</span>
            <input
              name="lastName"
              autoComplete="family-name"
              required
              maxLength={80}
              placeholder="Your last name"
            />
          </label>
          <label>
            Email <span>*</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="you@company.com"
            />
          </label>
          <label>
            Phone <span>*</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              minLength={7}
              maxLength={35}
              placeholder="(000) 000-0000"
            />
          </label>
        </div>
        <label>
          I’m interested in <span>*</span>
          <select
            name="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            required
          >
            {interests.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </label>
        <label>
          Company / brand
          <input
            name="company"
            autoComplete="organization"
            maxLength={160}
            placeholder="What are you building?"
          />
        </label>
        {['Business club', 'Outside marketing'].includes(interest) && (
          <label>
            Annual company revenue <span>*</span>
            <select name="revenue" required defaultValue="">
              <option value="" disabled>
                Select a range
              </option>
              <option>Pre-revenue</option>
              <option>Under $250,000</option>
              <option>$250,000 to $1 million</option>
              <option>$1 million to $5 million</option>
              <option>$5 million to $10 million</option>
              <option>$10 million+</option>
              <option>Prefer to discuss</option>
            </select>
          </label>
        )}
        {['Event inquiry', 'Book a visit'].includes(interest) && (
          <div className="form-grid">
            <label>
              Preferred date
              <input name="eventDate" type="date" />
            </label>
            {interest === 'Event inquiry' && (
              <label>
                Expected guests
                <input
                  name="guests"
                  type="number"
                  min="1"
                  max="10000"
                  placeholder="Approximate count"
                />
              </label>
            )}
          </div>
        )}
        <label>
          {['Business club', 'Car club', 'Social club', 'Lift membership'].includes(interest)
            ? 'Why would you be a good fit?'
            : 'What do you have in mind?'}{' '}
          <span>*</span>
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={4000}
            rows={4}
            placeholder="Your ideas. Your ambition. Your story."
          />
        </label>
        <div className="honey-field" aria-hidden="true">
          <label>
            Leave this field empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="consent-field">
          <input type="checkbox" name="consent" required />
          <span>
            I agree to be contacted by BRICKS about this inquiry.{' '}
            <Link href="/privacy">Privacy policy</Link>.
          </span>
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="form-submit" type="submit">
          Review my inquiry <ArrowUpRight size={22} />
        </button>
        <p className="form-note">
          {directDelivery
            ? 'Review your details before sending to the BRICKS team.'
            : 'We’ll prepare your inquiry to send to Brett from your email app.'}
        </p>
        <noscript>
          <p>
            To contact the house without JavaScript, email{' '}
            <a href="mailto:brett@bricksslc.com">brett@bricksslc.com</a> or call (801) 214-5584.
            This form requires JavaScript to prepare your message.
          </p>
          <style>{'.form-submit{display:none}'}</style>
        </noscript>
      </form>
      {prepared && (
        <div className="inquiry-review" ref={review} tabIndex={-1}>
          <p className="micro gold">Take one last look.</p>
          <h2>
            Your way
            <br />
            into the house.
          </h2>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>
                {prepared.firstName} {prepared.lastName}
              </dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                {prepared.email}
                <br />
                {prepared.phone}
              </dd>
            </div>
            <div>
              <dt>Interested in</dt>
              <dd>{prepared.interest}</dd>
            </div>
            {prepared.company && (
              <div>
                <dt>Company</dt>
                <dd>{prepared.company}</dd>
              </div>
            )}
            {prepared.revenue && (
              <div>
                <dt>Annual revenue</dt>
                <dd>{prepared.revenue}</dd>
              </div>
            )}
            {prepared.eventDate && (
              <div>
                <dt>Preferred date</dt>
                <dd>{prepared.eventDate}</dd>
              </div>
            )}
            {prepared.guests && (
              <div>
                <dt>Expected guests</dt>
                <dd>{prepared.guests}</dd>
              </div>
            )}
            <div>
              <dt>Your story</dt>
              <dd className="review-message">{prepared.message}</dd>
            </div>
          </dl>
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          {directDelivery ? (
            <button className="form-submit" disabled={busy} onClick={send}>
              {busy ? 'Sending…' : 'Send to BRICKS'}
              <ArrowUpRight size={22} />
            </button>
          ) : (
            <a className="form-submit" href={inquiryMailto(prepared)}>
              Open email & send
              <ArrowUpRight size={22} />
            </a>
          )}
          <p className="form-note">
            {directDelivery
              ? 'To: brett@bricksslc.com'
              : 'Your message is ready, but has not been sent. Your email app will open with the details filled in. Press Send there to deliver it.'}
          </p>
          <div className="review-actions">
            <button onClick={() => setPrepared(null)}>
              <ArrowLeft size={16} /> Edit details
            </button>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(inquiryText(prepared));
                  setCopied(true);
                } catch {
                  setError(
                    'Copy is unavailable in this browser. You can select the details above.',
                  );
                }
              }}
            >
              <Copy size={16} />
              {copied ? 'Copied' : 'Copy inquiry'}
            </button>
          </div>
          {directDelivery && error && (
            <a className="arrow-link" href={inquiryMailto(prepared)}>
              Use my email app instead <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      )}
    </>
  );
}
