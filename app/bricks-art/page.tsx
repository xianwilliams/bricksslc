import type { Metadata } from 'next';
import { PageHero } from '@/components/page-parts';
import { ArtGallery } from '@/components/art-gallery';
import { ArrowLink } from '@/components/arrow-link';
export const metadata: Metadata = { title: 'BRICKS art' };
export default function Art() {
  return (
    <>
      <PageHero
        title="Never"
        accent="ordinary."
        kicker="BRICKS art"
        video="cars"
        poster="/media/art-car.webp"
        description="Art lives here. On the walls, on the cars, in the way we see things."
      />
      <section className="section art-intro">
        <h2 data-reveal>
          The house
          <br />
          <span className="gold">is the canvas.</span>
        </h2>
        <p data-reveal>
          Street culture and original expression are part of the everyday. Explore a few
          perspectives from the warehouse.
        </p>
      </section>
      <section className="section art-gallery-section">
        <ArtGallery />
      </section>
      <section className="art-coming section">
        <p className="micro gold">More is taking shape.</p>
        <h2>
          Watch
          <br />
          <span>this space.</span>
        </h2>
        <p>
          The BRICKS art collection is coming soon. Connect with the house about art, collaboration
          and what’s next.
        </p>
        <ArrowLink href="/contact?interest=Art%20collaboration">Get in</ArrowLink>
      </section>
    </>
  );
}
