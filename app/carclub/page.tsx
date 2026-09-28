import type { Metadata } from 'next';
import { PageHero, RouteCTA, FAQ } from '@/components/page-parts';
import { Photo } from '@/components/photo';
import { ArrowLink } from '@/components/arrow-link';
import { ScrollFilm } from '@/components/scroll-film';
import { StoryCopy, Highlight } from '@/components/story-copy';
import copy from '@/lib/original-copy.json';
export const metadata: Metadata = { title: 'Car club' };
export default function CarClub() {
  return (
    <>
      <PageHero
        title="Driven"
        accent="differently."
        kicker="BRICKS car club"
        video="cars"
        description="For collectors, dealers and the people who know it’s never just a car."
      />
      <section className="section car-intro">
        <p className="car-manifesto" data-reveal>
          Some cars fill a garage.
          <br />
          <Highlight>These start a conversation.</Highlight>
        </p>
        <div className="car-spec-line">
          <span>Exceptional cars</span>
          <span>Original content</span>
          <span>Shared obsession</span>
        </div>
        <div className="social-handles">
          <a href="https://www.instagram.com/hypercar_ranch/" target="_blank" rel="noreferrer">
            @hypercar_ranch ↗
          </a>
          <a href="https://www.instagram.com/brett_chell/" target="_blank" rel="noreferrer">
            @brett_chell ↗
          </a>
        </div>
      </section>
      <section className="split-image-section section car-offer">
        <ScrollFilm
          film="car-motion"
          word="DRIVEN"
          label="Art in motion"
          caption="Every angle. A different story."
          className="film-portrait"
        />
        <div data-reveal>
          <p className="micro gold">External membership</p>
          <h2>
            Your cars.
            <br />A bigger
            <br />
            <span className="gold">platform.</span>
          </h2>
          <p className="availability-label">Limited to 50 spots</p>
          <StoryCopy
            paragraphs={copy.carExternal}
            emphasis={['30 million monthly views', 'it’s a platform', "it's a platform"]}
          />
          <ArrowLink href="/contact?interest=Car%20club">Apply now</ArrowLink>
        </div>
      </section>
      <section className="lift-section">
        <Photo name="supercar" alt="A Lamborghini and life in the BRICKS warehouse" />
        <div className="lift-copy" data-reveal>
          <p className="micro">Lift membership</p>
          <h2>
            A home for
            <br />
            <span>your obsession.</span>
          </h2>
          <p className="availability-label">Limited to 12 spots</p>
          <StoryCopy
            paragraphs={copy.carLift}
            emphasis={['10m+ views a month', '65 pieces of content']}
          />
          <ArrowLink href="/contact?interest=Lift%20membership" light>
            Explore lift membership
          </ArrowLink>
        </div>
      </section>
      <section className="section automotive-partners">
        <h2>Our partners.</h2>
        <img
          src="/media/carclub-18.webp"
          alt="The original automotive partner marks from BRICKS Car Club"
          width="1306"
          height="218"
          loading="lazy"
        />
      </section>
      <FAQ
        items={[
          [
            'Is this for private collectors or dealers?',
            'Both. External and lift membership paths are designed for collectors and exotic car dealers, with options discussed directly with the team.',
          ],
          [
            'Can BRICKS create content without me on camera?',
            'Yes. The car club’s creative offering can focus on the cars and the collection itself.',
          ],
          [
            'How many spots are available?',
            'The original BRICKS information lists a 50-spot external membership limit and describes twelve hypercar membership spots. Contact the team to confirm the relevant category and current availability.',
          ],
        ]}
      />
      <RouteCTA title="Bring your collection into the conversation." interest="Car club" />
    </>
  );
}
