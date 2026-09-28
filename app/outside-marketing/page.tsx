import type { Metadata } from 'next';
import { PageHero, RouteCTA } from '@/components/page-parts';
import { Photo } from '@/components/photo';
import { ArrowLink } from '@/components/arrow-link';
import { AmbientVideo } from '@/components/video';
import { StoryCopy } from '@/components/story-copy';
import copy from '@/lib/original-copy.json';
export const metadata: Metadata = { title: 'Outside marketing' };
export default function Marketing() {
  return (
    <>
      <PageHero
        title="Make"
        accent="some noise."
        kicker="Outside marketing"
        video="studio"
        description="The BRICKS creative engine. Built around your brand."
      />
      <section className="section">
        <div className="editorial">
          <h2 data-reveal>
            Be part of
            <br />
            <span className="gold">the story.</span>
          </h2>
          <div className="editorial-text" data-reveal>
            <p className="micro gold">Corporate, influencer, individual</p>
            <StoryCopy
              paragraphs={copy.marketing}
              emphasis={['next-generation brand storytelling', 'high-impact content']}
            />
            <ArrowLink href="/contact?interest=Outside%20marketing">Start a conversation</ArrowLink>
          </div>
        </div>
      </section>
      <div className="marketing-panels">
        <article>
          <Photo name="bts" alt="Behind the scenes of a BRICKS production" />
          <div>
            <span className="micro">Film & photography</span>
            <h2>
              Make it
              <br />
              unmissable.
            </h2>
          </div>
        </article>
        <article>
          <Photo name="talk" alt="A discussion in the BRICKS creative space" />
          <div>
            <span className="micro">Podcasts & storylines</span>
            <h2>
              Give them
              <br />a reason
              <br />
              to return.
            </h2>
          </div>
        </article>
        <article>
          <AmbientVideo
            src="/media/event-photo-loop.mp4"
            poster="/media/event-wide.webp"
            label="The BRICKS warehouse gathering, animated from the original event photograph"
          />
          <div>
            <span className="micro">Events & experiences</span>
            <h2>
              Make it
              <br />a moment.
            </h2>
          </div>
        </article>
      </div>
      <section className="section">
        <div className="editorial">
          <h2 data-reveal>
            Real life.
            <br />
            <span className="gold">Real impact.</span>
          </h2>
          <div className="editorial-text" data-reveal>
            <p>
              We start with your business, your audience and what makes you different. Then we find
              the stories worth telling and create the assets that let those stories travel.
            </p>
            <ArrowLink href="/content-strategy">Inside the content engine</ArrowLink>
          </div>
        </div>
      </section>
      <RouteCTA title="Your brand has a story. Let’s make it move." interest="Outside marketing" />
    </>
  );
}
