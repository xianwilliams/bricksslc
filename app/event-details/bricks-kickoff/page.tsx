import type { Metadata } from 'next';
import { PageHero } from '@/components/page-parts';
import { Photo } from '@/components/photo';
import { ArrowLink } from '@/components/arrow-link';
export const metadata: Metadata = { title: 'BRICKS Kickoff. Event archive' };
export default function Kickoff() {
  return (
    <>
      <PageHero
        title="The"
        accent="kickoff."
        kicker="Event archive · March 31, 2026"
        video="culture"
        description="The house opened. A new chapter began."
      />
      <section className="section editorial">
        <div>
          <h2>
            BRICKS
            <br />
            <span className="gold">kickoff.</span>
          </h2>
        </div>
        <div className="editorial-text">
          <p className="micro gold">Time & location</p>
          <p className="lead">
            March 31, 2026
            <br />
            6:00 PM to 10:00 PM
          </p>
          <p>
            733 W 800 S<br />
            Salt Lake City, Utah 84104
          </p>
          <p>This event has ended. Registration is closed.</p>
          <ArrowLink href="/events">Explore the culture</ArrowLink>
          <ArrowLink href="/contact?interest=Event%20inquiry">Ask about what’s next</ArrowLink>
        </div>
      </section>
      <Photo name="event-wide" alt="A gathering at the BRICKS warehouse" className="full-photo" />
    </>
  );
}
