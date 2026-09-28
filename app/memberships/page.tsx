import type { Metadata } from 'next';
import { PageHero, FAQ } from '@/components/page-parts';
import { MembershipRows } from '@/components/membership-rows';
import { Ticker } from '@/components/ticker';
export const metadata: Metadata = { title: 'Membership opportunities' };
export default function Memberships() {
  return (
    <>
      <PageHero
        title="Your kind"
        accent="of people."
        kicker="Membership opportunities"
        description="Four ways into one extraordinary house."
        video="bricks-montage"
        poster="/media/hero-poster.jpg"
      />
      <Ticker />
      <section className="section">
        <div className="section-heading" data-reveal>
          <h2>
            What member
            <br />
            <span className="gold">are you?</span>
          </h2>
        </div>
        <MembershipRows />
      </section>
      <FAQ
        items={[
          [
            'How do I become a member?',
            'Tell us about yourself through the membership inquiry. The BRICKS team will talk through fit, availability and the membership that makes sense for you.',
          ],
          [
            'Can I visit first?',
            'Yes. Request a visit and the team will arrange a time to show you the warehouse and answer your questions.',
          ],
          [
            'Do I have to work in the building?',
            'The membership paths serve different needs, from businesses building in the house to car collectors, the social community and outside brands.',
          ],
          [
            'Where can I find current pricing?',
            'Membership terms and availability are discussed directly with BRICKS. Get in touch for the current details.',
          ],
        ]}
      />
    </>
  );
}
