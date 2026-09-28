import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/site';
import copy from '@/lib/original-copy.json';
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-invitation">
        <p className="micro">Contact us / Connect with BRICKS</p>
        <Link href="/contact" className="footer-headline">
          You belong
          <br />
          <span>in the house.</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
        <p className="footer-mission">{copy.invitation}</p>
      </div>
      <div className="footer-details">
        <a href={site.maps} target="_blank" rel="noreferrer">
          733 W 800 S<br />
          Salt Lake City, Utah 84104 ↗
        </a>
        <div>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href="tel:+18012145584">{site.phone}</a>
        </div>
        <div>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
          <a href={site.youtube} target="_blank" rel="noreferrer">
            YouTube ↗
          </a>
        </div>
        <div>
          <Link href="/memberships">Memberships ↗</Link>
          <Link href="/book-online">Book a visit ↗</Link>
        </div>
      </div>
      <div className="footer-brand">
        <img src="/brand/logo.png" alt="BRICKS Brand House" width="1223" height="329" />
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} BRICKS SLC</span>
        <span>Built for a different kind of life.</span>
        <div>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
