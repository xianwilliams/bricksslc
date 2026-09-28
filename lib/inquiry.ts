import { z } from 'zod';
import { site } from './site.ts';
export const interests = [
  'Business club',
  'Car club',
  'Lift membership',
  'Social club',
  'Outside marketing',
  'Event inquiry',
  'Content strategy',
  'Art collaboration',
  'Book a visit',
  'General inquiry',
] as const;
export const inquirySchema = z
  .object({
    firstName: z.string().trim().min(1, 'Enter your first name.').max(80),
    lastName: z.string().trim().min(1, 'Enter your last name.').max(80),
    email: z.email('Enter a valid email address.').max(254),
    phone: z
      .string()
      .trim()
      .min(7, 'Enter your phone number.')
      .max(35)
      .regex(/^[+\d\s().-]+$/, 'Enter a valid phone number.'),
    interest: z.enum(interests),
    company: z.string().trim().max(160).default(''),
    revenue: z.string().trim().max(80).default(''),
    message: z.string().trim().min(10, 'Tell us a little more, at least 10 characters.').max(4000),
    eventDate: z.union([z.literal(''), z.iso.date('Enter a valid date.')]).default(''),
    guests: z
      .string()
      .refine(
        (v) => v === '' || (/^\d{1,5}$/.test(v) && Number(v) > 0 && Number(v) <= 10000),
        'Enter a guest count between 1 and 10,000.',
      )
      .default(''),
    website: z.string().max(0, 'Please try again.').default(''),
    consent: z.literal(true, { error: 'Please agree to be contacted about your inquiry.' }),
  })
  .superRefine((data, ctx) => {
    if (['Business club', 'Outside marketing'].includes(data.interest) && !data.revenue)
      ctx.addIssue({
        code: 'custom',
        path: ['revenue'],
        message: 'Select an annual revenue range.',
      });
  });
export type Inquiry = z.infer<typeof inquirySchema>;
export function inquiryText(d: Inquiry) {
  return [
    `BRICKS inquiry: ${d.interest}`,
    '',
    `Name: ${d.firstName} ${d.lastName}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    d.company ? `Company: ${d.company}` : '',
    d.revenue ? `Annual company revenue: ${d.revenue}` : '',
    d.eventDate ? `Preferred date: ${d.eventDate}` : '',
    d.guests ? `Expected guests: ${d.guests}` : '',
    'About my inquiry:',
    d.message,
    '',
    'I agree to be contacted about this inquiry.',
  ]
    .filter((s, i, a) => s || a[i - 1])
    .join('\n');
}
export function inquiryMailto(d: Inquiry) {
  return `mailto:${site.email}?subject=${encodeURIComponent(`BRICKS / ${d.interest} / ${d.firstName} ${d.lastName}`)}&body=${encodeURIComponent(inquiryText(d))}`;
}
