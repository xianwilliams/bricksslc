import type { Metadata } from 'next';
import Link from 'next/link';
import { PlantHero } from '@/components/plant-hero';
import { AmbientVideo } from '@/components/video';
import { Photo } from '@/components/photo';
import { ArrowLink } from '@/components/arrow-link';
import { team } from '@/lib/site';
import { StoryCopy, Highlight } from '@/components/story-copy';
import copy from '@/lib/original-copy.json';
export const metadata: Metadata = { title: 'About us' };
export default function About() {
  return (
    <>
      <PlantHero />
      <section className="welcome-section section">
        <div className="welcome-heading" data-reveal>
          <h2>
            Welcome
            <br />
            <span className="gold">to BRICKS.</span>
          </h2>
          <p>
            From the founder.
            <br />
            The idea behind the house, in Brett’s own words.
          </p>
        </div>
        <AmbientVideo
          src="/media/welcome.mp4"
          poster="/media/welcome-poster.jpg"
          label="Brett Chell welcomes you to BRICKS"
          sound
          fullFrame
        />
      </section>
      <section className="mission-section">
        <div className="mission-texture" />
        <div data-reveal>
          <p className="micro">Mission statement</p>
          <blockquote>
            “I just want
            <br />
            to do cool shit
            <br />
            <Highlight>with my friends.</Highlight>”
          </blockquote>
          <p className="mission-credit">Brett Chell, founder</p>
        </div>
      </section>
      <section className="section founder-intro">
        <Photo name="about-us-9" alt="Brett Chell, founder and owner of BRICKS" />
        <div data-reveal>
          <p className="micro gold">The person behind the house</p>
          <h2>
            Brett
            <br />
            Chell.
          </h2>
          <StoryCopy
            paragraphs={copy.founder}
            emphasis={['strong, scalable companies', 'grow with purpose']}
          />
          <ArrowLink href="/copy-of-founder-page">Meet the founder</ArrowLink>
        </div>
      </section>
      <section className="section team-section">
        <div className="section-heading" data-reveal>
          <p className="micro gold">Meet the team</p>
          <h2>
            The people
            <br />
            <span className="gold">behind it.</span>
          </h2>
        </div>
        <div className="team-grid">
          {team.slice(1).map((t) => (
            <Link href="/members#house-team" key={t.name}>
              <Photo name={t.image} alt={`${t.name}, ${t.role}`} />
              <h3>{t.name}</h3>
              <p>{t.role}</p>
            </Link>
          ))}
        </div>
        <ArrowLink href="/members">Meet the whole collective</ArrowLink>
      </section>
    </>
  );
}
