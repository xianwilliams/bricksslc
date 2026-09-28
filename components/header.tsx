'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ArrowUpRight, Plus, X } from 'lucide-react';
import { navigation, site } from '@/lib/site';
export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const path = usePathname();
  const close = () => {
    dialog.current?.close();
    document.body.style.overflow = '';
  };
  useEffect(() => {
    dialog.current?.close();
    document.body.style.overflow = '';
  }, [path]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="BRICKS homepage">
          <img src="/brand/logo.png" alt="BRICKS Brand House" width="1223" height="329" />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/" aria-current={path === '/' ? 'page' : undefined}>
            The house
          </Link>
          <Link href="/members" aria-current={path === '/members' ? 'page' : undefined}>
            The people
          </Link>
          <Link href="/events" aria-current={path === '/events' ? 'page' : undefined}>
            The culture
          </Link>
        </nav>
        <div className="nav-actions">
          <Link href="/contact" className="nav-cta">
            Get in
            <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-button"
            onClick={() => {
              dialog.current?.showModal();
              document.body.style.overflow = 'hidden';
            }}
            aria-label="Open navigation menu"
          >
            <span>Menu</span>
            <Plus size={22} />
          </button>
        </div>
      </header>
      <dialog ref={dialog} className="menu-dialog" aria-label="Site navigation" onCancel={close}>
        <div className="menu-top">
          <Link href="/" onClick={close}>
            <img src="/brand/logo.png" alt="BRICKS" width="180" height="49" />
          </Link>
          <button onClick={close} className="menu-button" aria-label="Close navigation menu">
            Close
            <X />
          </button>
        </div>
        <div className="menu-body">
          <nav aria-label="All pages">
            {navigation.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                aria-current={path === href ? 'page' : undefined}
              >
                {label}
                <ArrowUpRight />
              </Link>
            ))}
          </nav>
          <aside>
            <p className="micro">Salt Lake City, Utah</p>
            <p className="menu-mantra">
              A different
              <br />
              kind of house.
            </p>
            <p>{site.address}</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
          </aside>
        </div>
      </dialog>
    </>
  );
}
