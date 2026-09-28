import type { Metadata } from 'next';
import { PageHero } from '@/components/page-parts';
import { AmbientVideo } from '@/components/video';
import { Photo } from '@/components/photo';
import { ArrowLink } from '@/components/arrow-link';
import { StoryCopy } from '@/components/story-copy';
import copy from '@/lib/original-copy.json';
export const metadata: Metadata = { title: 'Brett Chell. The founder' };
export default function Founder() {
  return (
    <>
      <PageHero
        title="Brett"
        accent="Chell."
        kicker="Founder & owner"
        video="welcome"
        poster="/media/about-us-9.webp"
        description="An entrepreneur. An inventor. A believer in building something meaningful with good people."
      />
      <section className="section founder-story">
        <Photo name="about-us-9" alt="Brett Chell beside a car" />
        <div>
          <h2 data-reveal>
            A bigger
            <br />
            <span className="gold">picture.</span>
          </h2>
          <div className="editorial-text" data-reveal>
            <p className="lead">BRICKS brings business and life back into the same conversation.</p>
            <StoryCopy
              paragraphs={copy.founder}
              emphasis={['strong, scalable companies', 'grow with purpose']}
            />
            <ArrowLink href="/contact?interest=Business%20club">Connect with Brett</ArrowLink>
          </div>
        </div>
      </section>
      <section className="section welcome-section">
        <div className="welcome-heading">
          <h2>
            The idea.
            <br />
            <span className="gold">In his words.</span>
          </h2>
        </div>
        <AmbientVideo
          src="/media/welcome.mp4"
          poster="/media/welcome-poster.jpg"
          sound
          fullFrame
          label="Brett Chell on the vision for BRICKS"
        />
      </section>
    </>
  );
}
