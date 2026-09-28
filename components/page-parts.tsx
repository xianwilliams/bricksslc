import { AmbientVideo } from './video';
import { ArrowLink } from './arrow-link';
export function PageHero({
  title,
  accent,
  kicker,
  description,
  video = 'culture',
  poster,
  children,
  className = '',
}: {
  title: string;
  accent?: string;
  kicker: string;
  description?: string;
  video?: string;
  poster?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`page-hero ${className}`}>
      <AmbientVideo
        src={`/media/${video}.mp4`}
        poster={poster || `/media/${video}-poster.jpg`}
        label={`${kicker}, inside BRICKS`}
      />
      <div className="hero-shade" />
      <div className="page-hero-copy">
        <p className="micro">{kicker}</p>
        <h1>
          <span className="hero-line">
            <span>{title}</span>
          </span>
          {accent && (
            <span className="hero-line">
              <span className="gold">{accent}</span>
            </span>
          )}
        </h1>
        {description && <p>{description}</p>}
        {children}
      </div>
    </section>
  );
}
export function RouteCTA({
  title = 'Find your place in the house.',
  interest = '',
}: {
  title?: string;
  interest?: string;
}) {
  return (
    <section className="route-cta">
      <h2>{title}</h2>
      <ArrowLink href={`/contact${interest ? `?interest=${encodeURIComponent(interest)}` : ''}`}>
        Get in
      </ArrowLink>
    </section>
  );
}
export function FAQ({ items }: { items: [string, string][] }) {
  return (
    <section className="section">
      <div className="faq">
        <h2>Good questions.</h2>
        {items.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
