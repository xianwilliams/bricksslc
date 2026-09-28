'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>('.scroll-highlight').forEach((el) => {
          gsap.fromTo(
            el,
            { '--highlight': '0%' },
            {
              '--highlight': '100%',
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 48%', scrub: 0.6 },
            },
          );
        });
        // Typography has three distinct entrances; body copy follows a quieter rhythm.
        const owned =
          '.home-hero,.page-hero,.warehouse-journey,.plant-hero,[data-motion-owned],dialog,form,.slip-paper,.vip-badge';
        document
          .querySelectorAll<HTMLElement>(
            'main h2,main h3,main p,main .arrow-link,main span.micro,.footer-headline',
          )
          .forEach((el, index) => {
            if (el.closest(owned) || el.parentElement?.closest('h2,h3,p,.arrow-link')) return;
            const heading = /^H[23]$/.test(el.tagName) || el.classList.contains('footer-headline');
            const variant = index % 3;
            const from: gsap.TweenVars = heading
              ? variant === 0
                ? { y: 35, clipPath: 'inset(0 0 100% 0)' }
                : variant === 1
                  ? {
                      y: 28,
                      rotateX: 14,
                      transformPerspective: 900,
                      transformOrigin: 'left bottom',
                      opacity: 0,
                    }
                  : { x: -22, opacity: 0 }
              : { y: 18, opacity: 0 };
            gsap.from(el, {
              ...from,
              duration: heading ? 1.05 : 0.7,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 94%', once: true },
            });
          });
        document.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
          const bg = el.querySelector('.depth-background');
          const fg = el.querySelector('.depth-foreground');
          const scrollTrigger = {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.65,
          };
          if (bg)
            gsap.fromTo(
              bg,
              { yPercent: -2.5, scale: 1.09, transformOrigin: '50% 100%' },
              { yPercent: 2.5, scale: 1.09, ease: 'none', scrollTrigger },
            );
          if (fg)
            gsap.fromTo(
              fg,
              { yPercent: -2.5, scale: 1.075, transformOrigin: '50% 100%' },
              { yPercent: 2.5, scale: 1.105, ease: 'none', scrollTrigger },
            );
          if (el.matches('figure') && !el.closest('.membership-preview,.vip-badge')) {
            gsap.from(el, {
              clipPath: 'inset(8% 0 8% 0)',
              opacity: 0.25,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 96%', once: true },
            });
          }
        });
        document.querySelectorAll<HTMLElement>('[data-slip]').forEach((el) => {
          const scrollTrigger = { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 };
          gsap.fromTo(
            el.querySelector('.slip-paper'),
            { rotate: -1.1, y: 15 },
            { rotate: 0.4, y: -12, ease: 'none', scrollTrigger },
          );
          gsap.fromTo(
            el.querySelector('.slip-portrait'),
            { y: 32, rotate: 1.5 },
            { y: -30, rotate: -1, ease: 'none', scrollTrigger },
          );
          const second = el.querySelector('.slip-second-scene');
          if (second)
            gsap.fromTo(
              second,
              { y: 28, rotate: -6 },
              { y: -18, rotate: -2, ease: 'none', scrollTrigger },
            );
        });
        document.querySelectorAll<HTMLElement>('[data-badge]').forEach((el, i) => {
          gsap.fromTo(
            el,
            { rotate: i % 2 ? 1.2 : -1.2, y: 24 },
            {
              rotate: i % 2 ? -0.4 : 0.4,
              y: -12,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
            },
          );
        });
        document.querySelectorAll<HTMLElement>('.slip-paper,.vip-details').forEach((el) => {
          gsap.from(el.querySelectorAll('h2,h3,p,.slip-company-logo'), {
            y: 18,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });
      });
      return () => ctx.revert();
    });
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    document.fonts.ready.then(onLoad);
    return () => {
      mm.revert();
      window.removeEventListener('load', onLoad);
    };
  }, [pathname]);
  return null;
}
