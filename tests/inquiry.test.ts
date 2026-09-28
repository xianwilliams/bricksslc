import test from 'node:test';
import assert from 'node:assert/strict';
import { inquirySchema, inquiryMailto, inquiryText } from '../lib/inquiry.ts';
import { createContactHandler } from '../lib/contact-handler.ts';
const details = {
  firstName: 'Test',
  lastName: 'Visitor',
  email: 'visitor@example.com',
  phone: '8015550123',
  interest: 'General inquiry',
  message: 'I would like to visit the house.',
  consent: true,
};
const request = (body: unknown = details, headers: Record<string, string> = {}) =>
  new Request('https://www.bricksslc.com/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: 'https://www.bricksslc.com',
      ...headers,
    },
    body: JSON.stringify(body),
  });
test('membership revenue, consent and spam fields are validated on the server', () => {
  assert.equal(inquirySchema.safeParse({ ...details, interest: 'Business club' }).success, false);
  assert.equal(
    inquirySchema.safeParse({ ...details, interest: 'Business club', revenue: 'Prefer to discuss' })
      .success,
    true,
  );
  assert.equal(inquirySchema.safeParse({ ...details, consent: false }).success, false);
  assert.equal(inquirySchema.safeParse({ ...details, website: 'spam' }).success, false);
});
test('invalid dates, guest counts, phone and email cannot enter a reviewed inquiry', () => {
  for (const override of [
    { eventDate: '2026-02-31' },
    { guests: '-1' },
    { guests: '10001' },
    { phone: 'abcdefghi' },
    { email: 'bad@' },
  ])
    assert.equal(inquirySchema.safeParse({ ...details, ...override }).success, false);
});
test('email draft preserves punctuation, line breaks and the approved recipient', () => {
  const d = inquirySchema.parse({
    ...details,
    firstName: 'A & B',
    message: 'A first line.\nA second & third?',
  });
  const url = new URL(inquiryMailto(d));
  assert.equal(url.pathname, 'brett@bricksslc.com');
  assert.equal(url.searchParams.get('body'), inquiryText(d));
  assert.match(url.searchParams.get('subject') || '', /A & B/);
});
test('unconfigured delivery never claims success or contacts a provider', async () => {
  let calls = 0;
  const h = createContactHandler({
    config: {},
    fetcher: async () => {
      calls++;
      throw Error('must not call');
    },
  });
  const r = await h(request());
  assert.equal(r.status, 503);
  assert.equal(calls, 0);
  assert.equal((await r.json()).sent, undefined);
});
test('cross-origin, malformed, oversized and unconsented submissions are rejected', async () => {
  const h = createContactHandler({ config: {} });
  assert.equal((await h(request(details, { origin: 'https://spam.example' }))).status, 403);
  assert.equal(
    (await h(request(details, { 'content-type': 'application/x-www-form-urlencoded' }))).status,
    415,
  );
  assert.equal((await h(request({ ...details, message: 'x'.repeat(16001) }))).status, 413);
  assert.equal((await h(request({ ...details, consent: false }))).status, 400);
  const malformed = new Request('https://www.bricksslc.com/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{',
  });
  assert.equal((await h(malformed)).status, 400);
});
test('provider receives plain text and success follows its acceptance', async () => {
  let payload: Record<string, unknown> = {};
  const h = createContactHandler({
    config: { apiKey: 'fake-unit-test-only', from: 'test@example.com' },
    fetcher: async (_url, init) => {
      payload = JSON.parse(String(init?.body));
      return Response.json({ id: 'mock' });
    },
  });
  const r = await h(request({ ...details, message: '<script>literal visitor text</script>' }));
  assert.equal(r.status, 200);
  assert.equal((await r.json()).sent, true);
  assert.equal(payload.to, 'brett@bricksslc.com');
  assert.equal(payload.reply_to, 'visitor@example.com');
  assert.equal(payload.html, undefined);
  assert.match(String(payload.text), /<script>literal visitor text<\/script>/);
});
test('provider failures and timeout errors never produce a sent state', async () => {
  for (const fetcher of [
    async () => Response.json({}, { status: 503 }),
    async () => {
      throw new Error('timeout');
    },
  ]) {
    const h = createContactHandler({
      config: { apiKey: 'fake', from: 'test@example.com' },
      fetcher,
    });
    const r = await h(request());
    assert.equal(r.status, 502);
    assert.equal((await r.json()).sent, undefined);
  }
});
test('repeat submissions are limited and expire without retaining email addresses', async () => {
  let time = 1000,
    calls = 0;
  const h = createContactHandler({
    config: { apiKey: 'fake', from: 'test@example.com' },
    now: () => time,
    fetcher: async () => {
      calls++;
      return Response.json({ id: 'mock' });
    },
  });
  for (let i = 0; i < 3; i++) assert.equal((await h(request())).status, 200);
  assert.equal((await h(request())).status, 429);
  assert.equal(calls, 3);
  time += 600001;
  assert.equal((await h(request())).status, 200);
});
