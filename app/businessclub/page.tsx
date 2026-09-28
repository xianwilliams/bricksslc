import type { Metadata } from 'next';
import { ArrowUpRight, Camera, Users, Building2, Clapperboard } from 'lucide-react';
import Link from 'next/link';
import { PageHero, RouteCTA, FAQ } from '@/components/page-parts';
import { ScrollFilm } from '@/components/scroll-film';
import { ArrowLink } from '@/components/arrow-link';
import { partners } from '@/lib/site';
import { StoryCopy } from '@/components/story-copy';
import copy from '@/lib/original-copy.json';
export const metadata: Metadata = { title: 'Business club' };
export default function Business() {
  return (
    <>
      <PageHero
        title="Built"
        accent="together."
        kicker="Business club"
        video="studio"
        poster="/media/table.webp"
        description="A chosen collective of founders, creators and people building something that matters."
      />
      <section className="section">
        <div className="editorial">
          <h2 data-reveal>
            The right
            <br />
            <span className="gold">company.</span>
          </h2>
          <div className="editorial-text" data-reveal>
            <p className="micro gold">Chosen collective</p>
            <StoryCopy
              paragraphs={copy.business}
              emphasis={['the founding 14', 'personal and corporate brand explosion']}
            />
            <div className="social-handles">
              <a href="https://www.instagram.com/lordpicklecars/" target="_blank" rel="noreferrer">
                @lordpicklecars ↗
              </a>
              <a href="https://www.instagram.com/car1er/" target="_blank" rel="noreferrer">
                @car1er ↗
              </a>
            </div>
            <ArrowLink href="/contact?interest=Business%20club">Apply now</ArrowLink>
          </div>
        </div>
        <div className="benefit-list">
          {[
            [
              Users,
              'A chosen collective',
              'Build relationships with entrepreneurs, business owners and creatives.',
            ],
            [
              Camera,
              'A content engine',
              'Photography, video and storytelling built around your real business.',
            ],
            [
              Building2,
              'A different environment',
              'Art, cars, studios and shared space that spark new conversations.',
            ],
            [
              Clapperboard,
              'A story with momentum',
              'Ongoing storylines that give people a reason to keep watching.',
            ],
          ].map(([Icon, title, copy]) => {
            const I = Icon as typeof Users;
            return (
              <div key={String(title)}>
                <I />
                <div>
                  <h3>{String(title)}</h3>
                  <p>{String(copy)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <ScrollFilm
        film="create-motion"
        word="CREATE"
        label="Good ideas start here"
        caption="A house that moves you forward."
        className="film-wide"
      />
      <section className="section">
        <div className="editorial">
          <h2 data-reveal>
            A collective
            <br />
            with <span className="gold">range.</span>
          </h2>
          <div className="editorial-text" data-reveal>
            <p className="micro gold">Our partners</p>
            <p>
              Construction and culture. Automotive and health. Water, energy, media and the ideas
              still taking shape. The house is stronger because the people in it are different.
            </p>
            <ArrowLink href="/members">Meet the members</ArrowLink>
          </div>
        </div>
        <div className="partner-index">
          {partners.map((p) => (
            <Link href={`/members#${p.image}`} key={p.name}>
              <span>
                <strong>{p.name}</strong>
                <small>{p.people}</small>
              </span>
              <ArrowUpRight size={15} />
            </Link>
          ))}
        </div>
      </section>
      <FAQ
        items={[
          [
            'Who is the business club for?',
            'Entrepreneurs and business owners looking for a private collective, a creative environment and a content system that supports their personal and corporate brands.',
          ],
          [
            'What happens after I apply?',
            'The team reviews your inquiry and connects with you to discuss your business, goals, fit and current membership opportunities.',
          ],
        ]}
      />
      <RouteCTA title="Build your next chapter here." interest="Business club" />
    </>
  );
}
