'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { memberships } from '@/lib/site';
import { Photo } from './photo';
export function MembershipRows() {
  const [active, setActive] = useState(0);
  return (
    <div className="membership-picker">
      <div className="membership-preview" aria-hidden="true">
        {memberships.map((m, i) => (
          <div
            key={m.slug}
            className={`membership-preview-plane ${active === i ? 'is-active' : ''}`}
          >
            <Photo name={m.image} alt="" />
          </div>
        ))}
        <span className="preview-caption">{memberships[active].description}</span>
      </div>
      <div className="membership-rows">
        {memberships.map((m, i) => (
          <Link
            key={m.slug}
            href={`/${m.slug}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={active === i ? 'is-active' : ''}
          >
            <span className="micro">{m.label}</span>
            <div>
              <h3>{m.title}</h3>
              <ArrowUpRight />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
