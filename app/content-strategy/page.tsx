import type { Metadata } from 'next';
import { PageHero, RouteCTA } from '@/components/page-parts';
import { Photo } from '@/components/photo';
import { FilmButton } from '@/components/video';
import { ScrollFilm } from '@/components/scroll-film';
export const metadata: Metadata = { title: 'Content strategy' };
export default function Content() {
  return (
    <>
      <PageHero
        title="Life makes"
        accent="the content."
        kicker="The BRICKS content machine"
        video="studio"
        description="Real people. Real storylines. A reason to keep watching."
      />
      <section className="section content-intro">
        <h2 data-reveal>
          Don’t perform
          <br />a life.
          <br />
          <span className="gold">Build one.</span>
        </h2>
        <div className="editorial-text" data-reveal>
          <p className="lead">The story is already happening.</p>
          <p>
            The house brings people, projects and creative energy together. Our content engine
            captures that life and develops storylines around the people and businesses inside it.
          </p>
          <p>
            Original video, photography, podcasts and short-form edits. Different formats, working
            from the same authentic story.
          </p>
        </div>
      </section>
      <section className="content-process">
        <article>
          <Photo name="table" alt="A working conversation at the BRICKS table" />
          <div>
            <p className="micro">Find the story</p>
            <h2>
              Start
              <br />
              with life.
            </h2>
            <p>Your work, your point of view and the people around you become the raw material.</p>
          </div>
        </article>
        <article>
          <Photo name="bts" alt="Production behind the scenes at BRICKS" />
          <div>
            <p className="micro">Make it together</p>
            <h2>
              Capture
              <br />
              the moment.
            </h2>
            <p>
              A team, an environment and the creative tools to turn real moments into compelling
              media.
            </p>
          </div>
        </article>
        <article>
          <Photo name="/media/editors.jpg" alt="BRICKS editors working on a storyline" />
          <div>
            <p className="micro">Keep it moving</p>
            <h2>
              Build
              <br />
              the storyline.
            </h2>
            <p>
              Long-form stories and short-form moments give an audience multiple ways into your
              world.
            </p>
          </div>
        </article>
      </section>
      <section className="section bricked-up-feature">
        <div data-reveal>
          <p className="micro gold">Inside the house</p>
          <h2>
            Bricked
            <br />
            <span className="gold">up.</span>
          </h2>
          <p>Life behind the logo. Get a feel for the people, the work and the warehouse.</p>
          <FilmButton label="Watch the house film" />
        </div>
        <ScrollFilm
          film="create-motion"
          word="MAKE"
          label="From the BRICKED UP archive"
          caption="The idea is only the beginning."
          className="film-portrait"
        />
      </section>
      <RouteCTA title="Give your story a place to grow." interest="Content strategy" />
    </>
  );
}
