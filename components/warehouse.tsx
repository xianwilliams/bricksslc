'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Adapted from the publicly free MotionSites "Cast & Render" scroll-playhead prompt.
// The authored BRICKS edit, framing and content stay local to this scene.
export function Warehouse() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = root.current,
      v = video.current;
    if (!el || !v) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;
    let target = 0,
      frame = 0,
      active = false,
      disposed = false;
    let ready = false;
    const ensure = () => {
      if (!v.src) {
        v.src = '/media/warehouse-journey.mp4';
        v.load();
      }
    };
    const warm = () => {
      ready = true;
      const p = v.play();
      p?.then(() => {
        v.pause();
        v.currentTime = target;
      }).catch(() => {});
    };
    v.addEventListener('loadeddata', warm, { once: true });
    const tick = () => {
      if (disposed) return;
      if (active && ready && !v.seeking && v.duration) {
        const next = v.currentTime + (target - v.currentTime) * 0.2;
        if (Math.abs(next - v.currentTime) > 0.024) v.currentTime = next;
      }
      frame = requestAnimationFrame(tick);
    };
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          active = self.isActive;
          if (active) ensure();
        },
        onUpdate: (self) => {
          target = self.progress * Math.max(0, (v.duration || 6.2) - 0.08);
          el.style.setProperty('--journey', String(self.progress));
        },
      });
      gsap.fromTo(
        '.warehouse-frame',
        { rotateX: 12, rotateY: -9, scale: 0.9 },
        {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 55%', end: '65% bottom', scrub: 1 },
        },
      );
      gsap.to('.warehouse-title', {
        opacity: 0,
        y: -35,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: '45% center', scrub: true },
      });
      gsap.fromTo(
        '.warehouse-arrival',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: { trigger: el, start: '45% center', end: '75% bottom', scrub: true },
        },
      );
    }, el);
    frame = requestAnimationFrame(tick);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      v.removeEventListener('loadeddata', warm);
      v.pause();
      ctx.revert();
    };
  }, []);
  return (
    <section className="warehouse-journey" ref={root} aria-label="Inside the BRICKS warehouse">
      <div className="warehouse-stage">
        <div className="warehouse-frame">
          <img
            src="/media/warehouse-wide.jpg"
            alt="The BRICKS warehouse, with supercars, art, basketball court and mezzanine"
            width="1440"
            height="810"
          />
          <video ref={video} muted playsInline preload="none" aria-hidden="true" />
          <div className="warehouse-shade" />
          <div className="warehouse-title">
            <span className="micro">733 W 800 S. Salt Lake City.</span>
            <h2>
              This is
              <br />
              your kind
              <br />
              <span>of place.</span>
            </h2>
          </div>
          <div className="warehouse-arrival">
            <h2>
              Room to
              <br />
              <span>think bigger.</span>
            </h2>
            <p>
              Art. Supercars. Studios. A court.
              <br />
              And the people who make it all matter.
            </p>
          </div>
          <i className="frame-corner corner-tl" />
          <i className="frame-corner corner-br" />
        </div>
      </div>
    </section>
  );
}
