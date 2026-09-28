'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
export function PlantHero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('.plant-left', {
        xPercent: -22,
        rotate: -3,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
      });
      gsap.to('.plant-right', {
        xPercent: 22,
        rotate: 3,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
      });
      gsap.to('.neon-mark', {
        scale: 1.08,
        y: 45,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section className="plant-hero" ref={ref}>
      <img className="plant-wall" src="/media/wall-clean.webp" alt="" width="1672" height="941" />
      <div className="wall-darkness" />
      <div className="neon-mark">
        <img src="/brand/logo.png" alt="BRICKS Brand House" width="1223" height="329" />
      </div>
      <div className="plant-layer plant-left" aria-hidden="true">
        <img src="/media/foliage.webp" alt="" width="1677" height="941" />
      </div>
      <div className="plant-layer plant-right" aria-hidden="true">
        <img src="/media/foliage.webp" alt="" width="1677" height="941" />
      </div>
      <div className="plant-hero-title">
        <p className="micro">About BRICKS</p>
        <h1>
          <span className="hero-line">
            <span>A different</span>
          </span>
          <span className="hero-line">
            <span>kind of house.</span>
          </span>
        </h1>
        <p>Built around people. Filled with possibility.</p>
      </div>
    </section>
  );
}
