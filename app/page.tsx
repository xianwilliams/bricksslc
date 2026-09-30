import { AmbientVideo, FilmButton } from '@/components/video';
import { Ticker } from '@/components/ticker';
import { Photo } from '@/components/photo';
import { ArrowLink } from '@/components/arrow-link';
import { Warehouse } from '@/components/warehouse';
import { MembershipRows } from '@/components/membership-rows';
import { ScrollFilm } from '@/components/scroll-film';
import { StoryCopy, Highlight } from '@/components/story-copy';
import copy from '@/lib/original-copy.json';
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <AmbientVideo
          src="/media/bricks-montage.mp4"
          mobileSrc="/media/bricks-montage-mobile.mp4"
          poster="/media/hero-poster.jpg"
          label="30 seconds inside BRICKS, edited from BRICKED UP episodes one and two"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="hero-location">
            <span />
            Salt Lake City, Utah
          </p>
          <h1>
            <span className="hero-line">
              <span>For the</span>
            </span>
            <span className="hero-line">
              <span className="gold">creators.</span>
            </span>
          </h1>
          <div className="hero-baseline">
            <p>
              A <strong>lifestyle collective.</strong>
              <br />A <strong>brand house.</strong> A different way to build.
            </p>
            <FilmButton />
          </div>
        </div>
        <span className="hero-side-note">Art. Entrepreneurship. Culture.</span>
      </section>
      <Ticker />
      <section className="manifesto-section section">
        <div className="manifesto-heading" data-reveal>
          <p className="micro">Life first. Everything else follows.</p>
          <h2>
            Build something
            <br />
            that feels
            <br />
            <span className="gold">like living.</span>
          </h2>
        </div>
        <div className="manifesto-body" data-reveal>
          <StoryCopy
            paragraphs={copy.homeIntro}
            emphasis={['a lifestyle collective', 'a brand house', 'work feels alive again']}
          />
          <ArrowLink href="/contact">Get on the waiting list</ArrowLink>
        </div>
        <Photo
          name="work"
          alt="Creators collaborating around the table inside BRICKS"
          className="manifesto-photo"
        />
        <span className="manifesto-side" aria-hidden="true">
          Different by design.
        </span>
      </section>
      <Warehouse />
      <section className="section memberships-section" id="memberships">
        <div className="section-heading" data-reveal>
          <p className="micro">Membership opportunities</p>
          <h2>
            What member
            <br />
            <span className="gold">are you?</span>
          </h2>
        </div>
        <MembershipRows />
      </section>
      <section className="section home-content-system">
        <div>
          <p className="micro gold">The ambition behind the content</p>
          <blockquote>
            All our members deserve <Highlight>100 million views</Highlight> a month.
          </blockquote>
          <StoryCopy
            paragraphs={copy.homeEngine}
            emphasis={['tens of millions of views', 'authentic, storyline-based media']}
          />
          <ArrowLink href="/content-strategy">Inside the content engine</ArrowLink>
        </div>
        <ScrollFilm
          film="create-motion"
          word="CREATE"
          label="The BRICKS content system"
          caption="Real life. Built to travel."
          className="film-portrait"
        />
      </section>
      <section className="culture-section">
        <div className="culture-heading" data-reveal>
          <h2>
            Good people.
            <br />
            Great things.
            <br />
            <span className="gold">No small talk.</span>
          </h2>
          <ArrowLink href="/members">Meet the members</ArrowLink>
        </div>
        <Photo
          name="rambo"
          layered={false}
          alt="Life in the warehouse beside the BRICKS supercar collection"
          className="culture-tall"
        />
        <ScrollFilm
          film="court-motion"
          word="PLAY"
          label="Life between the work"
          caption="Make room for the good stuff."
          className="culture-wide"
        />
        <div className="culture-caption">
          <h3>
            Different
            <br />
            backgrounds.
            <br />
            <Highlight>Shared ambition.</Highlight>
          </h3>
          <p>
            Something bigger.
            <br />
            <strong>Built together.</strong>
          </p>
        </div>
      </section>
      <section className="event-teaser">
        <AmbientVideo
          src="/media/culture.mp4"
          poster="/media/night.webp"
          label="BRICKS culture and event film"
        />
        <div className="event-shade" />
        <div className="event-teaser-copy" data-reveal>
          <p className="micro">The house, after hours.</p>
          <h2>
            You had
            <br />
            <span>to be there.</span>
          </h2>
          <ArrowLink href="/events" light>
            Inside the culture
          </ArrowLink>
        </div>
        <p className="event-teaser-note">
          Private gatherings. Shared stories.
          <br />
          Unforgettable nights.
        </p>
      </section>
    </>
  );
}
