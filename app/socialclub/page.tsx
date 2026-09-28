import type { Metadata } from 'next';
import { PageHero, RouteCTA } from '@/components/page-parts';
import { Photo } from '@/components/photo';
import { ArrowLink } from '@/components/arrow-link';
import { StoryCopy } from '@/components/story-copy';
import copy from '@/lib/original-copy.json';
export const metadata: Metadata = { title: 'Social club' };
export default function Social() {
  return (
    <>
      <PageHero
        title="Find"
        accent="your people."
        kicker="BRICKS social club"
        video="culture"
        poster="/media/night.webp"
        description="The Salt Lake City professional doesn’t need another office. They need the right room."
      />
      <section className="social-manifesto section">
        <h2 data-reveal>
          Come for
          <br />
          the night.
          <br />
          <span className="gold">
            Stay for
            <br />
            the people.
          </span>
        </h2>
        <div>
          <Photo name="party" alt="Members celebrating at a BRICKS night" />
          <p>
            Private gatherings, creative energy and real relationships. A community that reaches
            beyond the usual introductions.
          </p>
        </div>
      </section>
      <section className="section social-story">
        <Photo name="casino-table" alt="Friends around a casino night table at BRICKS" />
        <div data-reveal>
          <h2>
            The BRICKS
            <br />
            <span className="gold">network.</span>
          </h2>
          <StoryCopy
            paragraphs={copy.social}
            emphasis={['the right room', 'tens of millions of views', 'this is where you belong']}
          />
          <div className="action-row">
            <ArrowLink href="/contact?interest=Social%20club">Apply now</ArrowLink>
            <ArrowLink href="/events">Explore the culture</ArrowLink>
          </div>
        </div>
      </section>
      <RouteCTA title="Life’s better with the right company." interest="Social club" />
    </>
  );
}
