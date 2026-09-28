'use client';
import { useEffect, useRef, useState } from 'react';
import { Photo } from './photo';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
const art = [
  { src: '/media/art-car.webp', name: 'Art in motion', detail: 'The warehouse collection' },
  { src: '/media/art-wall.jpg', name: 'Walls with a point of view', detail: 'Inside the house' },
  { src: '/media/bricks-art-7.webp', name: 'Original energy', detail: 'Art at BRICKS' },
];
// Adapts the free MotionSites photographic-archive prompt: an image-led collection
// with a keyboard-operable inspection view, using only BRICKS media.
export function ArtGallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  useEffect(
    () => () => {
      document.body.style.overflow = '';
    },
    [],
  );
  const close = () => {
    dialog.current?.close();
    document.body.style.overflow = '';
  };
  return (
    <>
      <div className="art-gallery">
        {art.map((a, i) => (
          <button
            key={a.src}
            onClick={() => {
              setIndex(i);
              dialog.current?.showModal();
              document.body.style.overflow = 'hidden';
            }}
            className="art-piece"
          >
            <Photo name={a.src} alt={a.name} />
            <span>
              {a.name}
              <ArrowRight size={19} />
            </span>
            <small>{a.detail}</small>
          </button>
        ))}
      </div>
      <dialog
        className="art-dialog"
        aria-label="Artwork viewer"
        ref={dialog}
        onCancel={close}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') setIndex((index + 1) % art.length);
          if (e.key === 'ArrowLeft') setIndex((index + art.length - 1) % art.length);
        }}
      >
        <button className="close-dialog" onClick={close} aria-label="Close artwork">
          <X />
        </button>
        <img src={art[index].src} alt={art[index].name} width="1400" height="1000" />
        <div className="art-dialog-bottom">
          <button
            onClick={() => setIndex((index + art.length - 1) % art.length)}
            aria-label="Previous artwork"
          >
            <ArrowLeft />
          </button>
          <div>
            <h3>{art[index].name}</h3>
            <p>{art[index].detail}</p>
          </div>
          <button onClick={() => setIndex((index + 1) % art.length)} aria-label="Next artwork">
            <ArrowRight />
          </button>
        </div>
      </dialog>
    </>
  );
}
