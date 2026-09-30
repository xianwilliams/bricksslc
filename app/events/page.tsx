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
        poster="/media/culture-live.webp"
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
      <section className="event-gallery" aria-label="Life at BRICKS">
        <div className="event-feature" data-motion-owned>
          <Photo
            name="culture-live"
            alt="Red stage lights over a packed live show at BRICKS"
            layered={false}
          />
          <div className="event-feature-shade" aria-hidden="true" />
          <div className="event-gallery-title">
            <p className="micro">The volume goes up. The house comes alive.</p>
            <h2>
              After
              <br />
              <span>hours.</span>
            </h2>
          </div>
          <span className="event-frame-note micro">Live from the house / SLC</span>
        </div>
        <div className="event-mosaic">
          <div className="event-dj">
            <Photo
              name="dj"
              alt="A DJ working the decks above the BRICKS warehouse floor"
              layered={false}
            />
            <span className="micro">Behind the decks. In the moment.</span>
          </div>
          <ScrollFilm
            film="celebrate-motion"
            word="TOGETHER"
            label="The energy of the house"
            caption="Some moments speak for themselves."
          />
        </div>
        <div className="event-feature event-crowd" data-motion-owned>
          <Photo
            name="culture-crowd"
            alt="Hands in the air in the crowd at a BRICKS live event"
            layered={false}
          />
          <div className="event-feature-shade" aria-hidden="true" />
          <div className="event-gallery-title">
            <p className="micro">Good people. All in.</p>
            <h2>
              No
              <br />
              <span>sidelines.</span>
            </h2>
          </div>
        </div>
      </section>
      <section className="section event-board">
        <div className="event-board-heading" data-reveal>
          <h2>
            In the
            <br />
            <span className="gold">house.</span>
          </h2>
          <p>Recent scenes and what’s next.</p>
          <Photo
            name="event-wide"
            alt="Cars, casino tables and a full house at BRICKS"
            layered={false}
          />
        </div>
        <div className="event-list">
          <article>
            <p className="micro">Scenes from the house</p>
            <h3>Casino night</h3>
            <p>A different kind of evening, surrounded by cars, art and good company.</p>
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
