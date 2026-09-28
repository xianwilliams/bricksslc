import { createContactHandler } from '@/lib/contact-handler';
export const runtime = 'nodejs';
export const POST = createContactHandler({
  config: {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.CONTACT_FROM,
  },
});
