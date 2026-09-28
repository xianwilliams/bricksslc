import type { Metadata } from 'next';
import { InquiryForm } from '@/components/inquiry-form';
import { AmbientVideo } from '@/components/video';
import { site } from '@/lib/site';
export const metadata: Metadata = { title: 'Get in. Contact BRICKS' };
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const params = await searchParams;
  return (
    <section className="contact-page">
      <div className="contact-backdrop">
        <AmbientVideo
          src="/media/culture.mp4"
          poster="/media/warehouse-wide.jpg"
          label="Life inside the BRICKS warehouse"
        />
        <div />
      </div>
      <div className="contact-layout">
        <div className="contact-copy">
          <p className="micro gold">733 W 800 S. Salt Lake City.</p>
          <h1>
            <span className="hero-line">
              <span>Get</span>
            </span>
            <span className="hero-line">
              <span className="gold">in.</span>
            </span>
          </h1>
          <p>
            Big ideas start with
            <br />a simple conversation.
          </p>
          <address>
            <a href={`mailto:${site.email}`}>{site.email} ↗</a>
            <a href="tel:+18012145584">{site.phone} ↗</a>
            <a href={site.maps} target="_blank" rel="noreferrer">
              733 W 800 S<br />
              Salt Lake City, UT 84104 ↗
            </a>
          </address>
        </div>
        <div className="contact-form-panel">
          <InquiryForm
            initialInterest={params.interest}
            directDelivery={Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM)}
          />
        </div>
      </div>
    </section>
  );
}
