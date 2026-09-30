import { LayeredImage } from './cutout';
import { Photo } from './photo';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';

type MemberProps = {
  name: string;
  role: string;
  image: string;
  bio?: string;
  href?: string;
  index?: number;
  logo?: string;
};

export function PinkSlip({
  name,
  role,
  image,
  bio,
  href,
  index = 0,
  logo = '/brand/logo.png',
}: MemberProps) {
  const fruitstand = image === 'businessclub-31';
  const framedPortrait = fruitstand || image === 'businessclub-36' || image === 'businessclub-45';
  return (
    <article className={`pink-slip ${fruitstand ? 'slip-duo' : ''}`} data-slip id={image}>
      <div className="slip-paper">
        <div className="slip-head">
          <span>BRICKS SOCIAL COLLECTIVE</span>
          <span>SALT LAKE CITY, UTAH</span>
        </div>
        <div className="slip-identity">
          <div
            className="slip-company-logo"
            style={{ '--company-logo': `url("${logo}")` } as CSSProperties}
          >
            <img
              src={logo}
              alt={`${logo === '/brand/logo.png' ? 'BRICKS' : role} logo`}
              width="200"
              height="90"
              loading="lazy"
            />
          </div>
          <span className="micro">
            Certificate
            <br />
            of belonging
          </span>
        </div>
        <div className="slip-title">
          <h2>{name}</h2>
        </div>
        <div className="slip-info">
          <span className="micro">Registered to</span>
          <h3>{role}</h3>
          {bio && <p>{bio}</p>}
          {href && (
            <Link href={href}>
              Meet the founder <ArrowUpRight size={17} />
            </Link>
          )}
        </div>
        <div className="slip-bottom">
          <div className="slip-barcode" aria-hidden="true" />
          <span>GOOD PEOPLE. GREAT COMPANY.</span>
          <span>UT / SLC</span>
        </div>
        <span className="slip-stamp" aria-hidden="true">
          IN GOOD
          <br />
          COMPANY.
        </span>
        <span className="slip-watermark" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="slip-portrait">
        <div className="slip-scene" data-depth>
          <LayeredImage
            name={image}
            src={`/media/${image}.webp`}
            alt={fruitstand ? 'Omar Prestwich, Fruitstand Studios' : name}
            layered={!framedPortrait}
            position={framedPortrait ? 'top' : 'center'}
          />
          {fruitstand && <span className="portrait-label">Omar Prestwich</span>}
          <div className="slip-photo-edge" />
        </div>
        {fruitstand && (
          <div className="slip-second-scene" data-depth>
            <LayeredImage
              name="mike-hardle"
              src="/media/mike-hardle.webp"
              alt="Mike Hardle outdoors, photographed for the Fruitstand Studios team"
              layered={false}
              position="top"
            />
            <span className="portrait-label">Mike Hardle</span>
          </div>
        )}
      </div>
      {!fruitstand && <div className="slip-tape" aria-hidden="true" />}
    </article>
  );
}

export function VipBadge({ name, role, image, bio, index = 0 }: MemberProps) {
  const framedPortrait = ['about-us-12', 'about-us-13', 'about-us-14'].includes(image);
  return (
    <article className="vip-badge" data-badge id={image}>
      <div className="vip-strap" aria-hidden="true" />
      <div className="vip-slot" aria-hidden="true" />
      <div className="vip-topline">
        <img src="/brand/logo.png" alt="BRICKS" width="164" height="45" loading="lazy" />
        <span>HOUSE TEAM / SLC</span>
      </div>
      <div className="vip-portrait">
        <Photo
          name={image}
          alt={`${name}, ${role}`}
          layered={!framedPortrait}
          position={framedPortrait ? 'top' : 'center'}
        />
        <span className="vip-portrait-number">0{index + 1}</span>
      </div>
      <div className="vip-details">
        <p className="vip-access">
          VIP <span>ACCESS</span>
        </p>
        <span className="micro">The people behind the house</span>
        <h2>{name}</h2>
        <h3>{role}</h3>
        {bio && <p>{bio}</p>}
      </div>
      <div className="vip-bottom">
        <span>CREATIVE / CULTURE / COLLECTIVE</span>
        <div className="vip-barcode" aria-hidden="true" />
        <span>BRICKS · UT</span>
      </div>
    </article>
  );
}
