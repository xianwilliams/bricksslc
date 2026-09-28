import type { Metadata } from 'next';
import { PageHero } from '@/components/page-parts';
import { ArrowLink } from '@/components/arrow-link';
import { Photo } from '@/components/photo';
export const metadata: Metadata = { title: 'Book a visit' };
const services = [
  {
    title: 'Exotic car club & storage',
    copy: 'Explore the car club, the collection and a home for your cars.',
    href: '/service-page/exotic-car-club-storage',
    image: 'art-car',
    details: '1 hr · BRICKS and BRANDS',
  },
  {
    title: 'Business workshop',
    copy: 'A conversation about the business you’re building and where it goes next.',
    href: '/service-page/business-workshop',
    image: 'table',
    details: '$150 USD · Course ended',
  },
  {
    title: 'Social club meetup',
    copy: 'Get to know the people, the warehouse and the social club.',
    href: '/service-page/social-club-meetup',
    image: 'casino-table',
    details: '$50 USD · Contact for upcoming sessions',
  },
];
export default function Booking() {
  return (
    <>
      <PageHero
        title="See"
        accent="for yourself."
        kicker="Visit the house"
        video="bricks-montage"
        poster="/media/warehouse-wide.jpg"
        description="Get a feel for the space. Meet the people. Find your place."
      />
      <section className="section booking-intro">
        <h2 data-reveal>
          Your first
          <br />
          <span className="gold">time in.</span>
        </h2>
        <p>
          Visits, workshops and meetups are arranged with the team. Tell us what you’d like to
          explore and we’ll talk through availability.
        </p>
        <ArrowLink href="/contact?interest=Book%20a%20visit">Request a visit</ArrowLink>
      </section>
      <section className="booking-services section">
        <p className="micro gold">Our services</p>
        {services.map((s) => (
          <article key={s.title}>
            <Photo name={s.image} alt={s.title} />
            <div>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
              <p className="service-summary">{s.details}</p>
              <ArrowLink href={s.href}>Explore</ArrowLink>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
