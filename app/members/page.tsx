import type { Metadata } from 'next';
import { PageHero, RouteCTA } from '@/components/page-parts';
import { PinkSlip, VipBadge } from '@/components/members';
import { partners, team } from '@/lib/site';
export const metadata: Metadata = { title: 'The members' };
export default function Members() {
  return (
    <>
      <PageHero
        title="In good"
        accent="company."
        kicker="The people of BRICKS"
        video="bricks-montage"
        poster="/media/creators.jpg"
        description="A house is only as good as the people in it. Meet ours."
      />
      <div className="members-directory">
        <a href="#collective">The collective ↘</a>
        <a href="#house-team">The house team ↘</a>
        <a href="/contact">Your name belongs here ↗</a>
      </div>
      <section className="slips-section" id="collective">
        <PinkSlip
          name="Brett Chell"
          role="Founder & owner"
          image="about-us-9"
          bio={team[0].bio}
          href="/copy-of-founder-page"
        />
        {partners.map((p, i) => (
          <PinkSlip
            key={p.name}
            name={p.people}
            role={p.name}
            image={p.image}
            logo={p.logo}
            index={i + 1}
          />
        ))}
      </section>
      <section className="house-team-slips" id="house-team">
        <div className="section-heading section" data-reveal>
          <p className="micro">The house team</p>
          <h2>
            The ones
            <br />
            <span className="gold">making it happen.</span>
          </h2>
        </div>
        <div className="vip-directory">
          {team.slice(1).map((t, i) => (
            <VipBadge
              key={t.name}
              name={t.name}
              role={t.role}
              image={t.image}
              bio={t.bio}
              index={i}
            />
          ))}
        </div>
      </section>
      <RouteCTA title="Your name belongs in this company." />
    </>
  );
}
