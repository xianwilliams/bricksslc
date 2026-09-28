import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, RouteCTA } from '@/components/page-parts';
import { Photo } from '@/components/photo';
import { ArrowLink } from '@/components/arrow-link';
import { site } from '@/lib/site';
import { ScrollFilm } from '@/components/scroll-film';
import { StoryCopy } from '@/components/story-copy';
import copy from '@/lib/original-copy.json';
export const metadata: Metadata = { title: 'Events & culture' };
export default function Events() {
  return (
    <>
      <PageHero
        title="You had"
        accent="to be there."
        kicker="BRICKS events"
        video="culture"
        poster="/media/crowd.webp"
        description="Private gatherings. Unfiltered energy. A room full of possibility."
      />
      <section className="section event-intro">
        <h2 data-reveal>
          Some nights
          <br />
          <span className="gold">stay with you.</span>
        </h2>
        <div className="editorial-text" data-reveal>
          <p className="micro gold">Exclusive events</p>
          <StoryCopy
            paragraphs={copy.events}
            emphasis={['connection, opportunity, and unforgettable moments']}
          />
          <ArrowLink href="/contact?interest=Event%20inquiry">Plan your event</ArrowLink>
        </div>
      </section>
      <section className="event-gallery">
        <Photo name="night" alt="A night inside BRICKS" />
        <Photo name="dj" alt="The DJ performing at BRICKS" />
        <div className="event-gallery-title">
          <h2>
            After
            <br />
            <span>hours.</span>
          </h2>
        </div>
        <Photo name="crowd" alt="A crowd at a BRICKS cultural gathering" />
        <ScrollFilm
          film="celebrate-motion"
          word="TOGETHER"
          label="The energy of the house"
          caption="Some moments speak for themselves."
          className="film-portrait"
        />
      </section>
      <section className="section event-board">
        <div className="event-board-heading" data-reveal>
          <h2>
            In the
            <br />
            <span className="gold">house.</span>
          </h2>
          <p>Recent scenes and what’s next.</p>
        </div>
        <div className="event-list">
          <article>
            <p className="micro">Scenes from the house</p>
            <h3>Casino night</h3>
            <p>A different kind of evening, surrounded by cars, art and good company.</p>
            <Photo name="casino" alt="Casino night in the warehouse" />
          </article>
          <article>
            <p className="micro">From the archive · March 31, 2026</p>
            <h3>BRICKS kickoff</h3>
            <p>The beginning of a new chapter. A house full of people ready to build.</p>
            <ArrowLink href="/event-details/bricks-kickoff">View the event</ArrowLink>
          </article>
          <article className="event-next">
            <p className="micro">The next invitation</p>
            <h3>
              Be in
              <br />
              the know.
            </h3>
            <p>
              Follow the latest from BRICKS or ask the team about upcoming gatherings. New dates are
              announced by the house.
            </p>
            <a className="arrow-link" href={site.instagram} target="_blank" rel="noreferrer">
              Follow BRICKS ↗
            </a>
            <Link href="/contact?interest=Event%20inquiry" className="arrow-link">
              Ask about events ↗
            </Link>
          </article>
        </div>
      </section>
      <RouteCTA title="Your people. Our house." interest="Event inquiry" />
    </>
  );
}
