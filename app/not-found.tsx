import { ArrowLink } from '@/components/arrow-link';
export default function NotFound() {
  return (
    <section className="not-found section">
      <p className="micro gold">Outside the house · 404</p>
      <h1>
        Wrong door.
        <br />
        Right place.
      </h1>
      <p>This page isn’t here. Come back inside.</p>
      <ArrowLink href="/">Back to BRICKS</ArrowLink>
    </section>
  );
}
