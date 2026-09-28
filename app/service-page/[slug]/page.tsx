import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PageHero } from '@/components/page-parts';
import { ArrowLink } from '@/components/arrow-link';
import { StoryCopy } from '@/components/story-copy';
import copy from '@/lib/original-copy.json';
const services: {
  [key: string]: {
    title: string;
    accent: string;
    label: string;
    interest: string;
    film: string;
  };
} = {
  'exotic-car-club-storage': {
    title: 'A place',
    accent: 'for your cars.',
    label: 'Exotic car club & storage',
    interest: 'Car club',
    film: 'cars',
  },
  'business-workshop': {
    title: 'Build',
    accent: 'with purpose.',
    label: 'Business workshop',
    interest: 'Business club',
    film: 'studio',
  },
  'social-club-meetup': {
    title: 'Meet',
    accent: 'your people.',
    label: 'Social club meetup',
    interest: 'Social club',
    film: 'culture',
  },
};
export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: services[slug]?.label || 'Visit BRICKS' };
}
export default async function Service({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services[slug];
  if (!s) notFound();
  const details = copy.services[slug as keyof typeof copy.services];
  return (
    <>
      <PageHero title={s.title} accent={s.accent} kicker={s.label} video={s.film} />
      <section className="section editorial">
        <h2>{s.label}</h2>
        <div className="editorial-text">
          <p className="lead">{details.subtitle}</p>
          <div className="service-facts">
            <strong>{details.rate}</strong>
            <span>{details.status}</span>
          </div>
          <StoryCopy paragraphs={[details.description]} />
          <p>
            Contact details
            <br />
            733 West 800 South, Salt Lake City, UT, USA
          </p>
          <p>
            Dates, pricing and availability are confirmed directly by BRICKS. An inquiry is a
            request, not a confirmed booking.
          </p>
          <ArrowLink href={`/contact?interest=${encodeURIComponent(s.interest)}`}>
            Ask the team
          </ArrowLink>
          <ArrowLink href="/book-online">All visit options</ArrowLink>
        </div>
      </section>
    </>
  );
}
