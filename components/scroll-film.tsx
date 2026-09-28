'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/** A short in-flow playhead, adapted from MotionSites' free Cast & Render pattern.
 * Seeking wakes only in view; it never starts an offscreen animation loop. */
export function ScrollFilm({
  film,
  word,
  label,
  caption,
  className = '',
}: {
  film: string;
  word: string;
  label: string;
  caption: string;
  className?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = root.current,
      v = video.current;
    if (!el || !v) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      let target = 0,
        frame = 0,
        active = false;
      const seek = () => {
        cancelAnimationFrame(frame);
        if (!active || document.hidden || !v.duration || v.seeking) return;
        const next = Math.min(v.duration - 0.04, target * v.duration);
        if (Math.abs(next - v.currentTime) > 0.035) v.currentTime = next;
      };
      const queue = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(seek);
      };
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !v.getAttribute('src')) {
            v.src = `/media/${film}.mp4`;
            v.load();
          }
        },
        { rootMargin: '400px' },
      );
      observer.observe(el);
      v.addEventListener('loadeddata', queue);
      v.addEventListener('seeked', queue);
      document.addEventListener('visibilitychange', queue);
      const ctx = gsap.context(() => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'bottom 10%',
              scrub: 0.55,
              onToggle: (self) => {
                active = self.isActive;
                queue();
              },
              onUpdate: (self) => {
                target = self.progress;
                el.style.setProperty('--film-progress', String(target));
                queue();
              },
            },
          })
          .fromTo(
            '.scroll-film-frame',
            { rotateY: -9, rotateX: 6, scale: 0.88, y: 30 },
            { rotateY: 4, rotateX: -2, scale: 1, y: -20, ease: 'none' },
            0,
          )
          .fromTo(
            '.scroll-film-word',
            { xPercent: -5, y: -15 },
            { xPercent: 5, y: 25, ease: 'none' },
            0,
          )
          .fromTo('.scroll-film-caption', { y: 20 }, { y: -20, ease: 'none' }, 0);
      }, el);
      return () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        ctx.revert();
        v.removeEventListener('loadeddata', queue);
        v.removeEventListener('seeked', queue);
        document.removeEventListener('visibilitychange', queue);
        v.removeAttribute('src');
        v.load();
      };
    });
    return () => mm.revert();
  }, [film]);
  return (
    <figure ref={root} className={`scroll-film ${className}`} data-motion-owned aria-label={label}>
      <span className="scroll-film-word" aria-hidden="true">
        {word}
      </span>
      <div className="scroll-film-frame">
        <video
          ref={video}
          poster={`/media/${film}-poster.jpg`}
          muted
          playsInline
          preload="none"
          aria-hidden="true"
        />
        <span className="scroll-film-vignette" />
        <span className="scroll-film-index micro">BRICKED UP / IN MOTION</span>
        <span className="scroll-film-guide micro">Scroll to play ↘</span>
        <span className="scroll-film-progress" aria-hidden="true" />
      </div>
      <figcaption className="scroll-film-caption">
        <span className="micro">{label}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
