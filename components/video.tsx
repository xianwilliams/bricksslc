'use client';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX, Maximize2, X } from 'lucide-react';
export function AmbientVideo({
  src,
  poster,
  className = '',
  label = 'BRICKS film',
  sound = false,
  fullFrame = false,
  mobileSrc,
}: {
  src: string;
  poster: string;
  className?: string;
  label?: string;
  sound?: boolean;
  fullFrame?: boolean;
  mobileSrc?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const ensureSource = () => {
      if (!video.getAttribute('src')) video.src = mobileSrc && innerWidth < 700 ? mobileSrc : src;
    };
    let inFrame = false;
    const update = () => {
      if (inFrame && !userPaused && !mq.matches && !document.hidden) {
        ensureSource();
        void video.play().catch(() => {});
      } else video.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inFrame = entry.isIntersecting && entry.intersectionRatio >= (fullFrame ? 0.95 : 0.18);
        update();
      },
      { threshold: [0, 0.18, 0.5, 0.95, 1] },
    );
    observer.observe(video);
    document.addEventListener('visibilitychange', update);
    mq.addEventListener('change', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      mq.removeEventListener('change', update);
      video.pause();
    };
  }, [src, mobileSrc, userPaused, fullFrame]);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      if (!v.src) v.src = mobileSrc && innerWidth < 700 ? mobileSrc : src;
      setUserPaused(false);
      void v.play().catch(() => {});
    } else {
      setUserPaused(true);
      v.pause();
    }
  };
  return (
    <div className={`ambient-video ${className}`}>
      <video
        ref={ref}
        muted={muted}
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="film-controls">
        <button onClick={toggle} aria-label={playing ? 'Pause video' : 'Play video'}>
          {playing ? <Pause size={14} /> : <Play size={14} />}
          <span>{playing ? 'Pause' : 'Play'}</span>
        </button>
        {sound && (
          <button
            onClick={() => setMuted(!muted)}
            aria-label={muted ? 'Turn sound on' : 'Mute sound'}
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{muted ? 'Sound off' : 'Sound on'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
export function FilmButton({
  src = '/media/bricks-montage.mp4',
  label = 'Watch the film',
}: {
  src?: string;
  label?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const close = () => {
    dialog.current?.close();
    video.current?.pause();
    document.body.style.overflow = '';
  };
  useEffect(
    () => () => {
      document.body.style.overflow = '';
    },
    [],
  );
  return (
    <>
      <button
        className="film-button"
        onClick={() => {
          dialog.current?.showModal();
          document.body.style.overflow = 'hidden';
          void video.current?.play().catch(() => {});
        }}
      >
        <span className="play-orbit">
          <Play size={16} fill="currentColor" />
        </span>
        {label}
        <Maximize2 size={13} />
      </button>
      <dialog
        className="film-dialog"
        aria-label="BRICKS film"
        ref={dialog}
        onCancel={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <button className="close-dialog" onClick={close} aria-label="Close film">
          <X />
        </button>
        <video ref={video} src={src} controls playsInline preload="none" />
        <p>BRICKS, Salt Lake City.</p>
      </dialog>
    </>
  );
}
