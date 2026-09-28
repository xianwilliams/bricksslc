'use client';
import { useEffect, useId, useRef, useState } from 'react';
import layers from '@/lib/photo-layers.json';

type LayerSpec = {
  width: number;
  height: number;
  maskWidth: number;
  maskHeight: number;
  transform: number[];
};
const photoLayers: Record<string, LayerSpec> = layers;

/** Keep the complete photograph until all three compositing assets are decoded.
 * Only the generated alpha is used on people; their RGB pixels stay original. */
export function LayeredImage({ name, src, alt }: { name: string; src: string; alt: string }) {
  const id = useId().replaceAll(':', '');
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const spec = photoLayers[name];
  const viewBox = spec
    ? `0 0 ${name === 'rambo' ? spec.width * 0.75 : spec.width} ${spec.height}`
    : undefined;
  const plate = `/media/plates/${name}.webp`;
  const mask = `/media/layers/${name}.webp`;

  useEffect(() => {
    const el = root.current;
    if (!el || !spec || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        Promise.all(
          [src, plate, mask].map(async (url) => {
            const image = new Image();
            image.src = url;
            await image.decode();
          }),
        )
          .then(() => {
            if (!disposed) setReady(true);
          })
          .catch(() => {
            // A complete original is the fallback for failed layer downloads.
          });
      },
      { rootMargin: '450px' },
    );
    observer.observe(el);
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [src, plate, mask, spec]);

  return (
    <div
      ref={root}
      className="layered-image"
      data-layer-ready={ready}
      data-photo={name}
      data-focal={name === 'talk' ? 'left' : undefined}
    >
      <div className="layer-background-frame">
        <img
          className="layer-original"
          src={src}
          alt={alt}
          width={spec?.width || 1600}
          height={spec?.height || 1200}
          loading="lazy"
        />
        {spec && (
          <div className="depth-background">
            {ready && (
              <svg
                viewBox={viewBox}
                preserveAspectRatio={name === 'talk' ? 'xMinYMid slice' : 'xMidYMid slice'}
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <filter
                    id={`${id}-hole`}
                    colorInterpolationFilters="sRGB"
                    x="-10%"
                    y="-10%"
                    width="120%"
                    height="120%"
                  >
                    <feComponentTransfer>
                      <feFuncA type="discrete" tableValues="0 1 1 1" />
                    </feComponentTransfer>
                    <feMorphology
                      operator="dilate"
                      radius={Math.max(spec.maskWidth, spec.maskHeight) * 0.04}
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                    />
                    <feGaussianBlur
                      stdDeviation={Math.max(spec.maskWidth, spec.maskHeight) * 0.013}
                    />
                  </filter>
                  <mask
                    id={`${id}-background-mask`}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width={spec.width}
                    height={spec.height}
                    style={{ maskType: 'luminance' }}
                  >
                    <rect width={spec.width} height={spec.height} fill="white" />
                    <image
                      href={mask}
                      width={spec.maskWidth}
                      height={spec.maskHeight}
                      transform={`matrix(${spec.transform.join(' ')})`}
                      filter={`url(#${id}-hole)`}
                    />
                  </mask>
                </defs>
                {/* Use the retouch only behind the removed foreground. The rest of the warehouse stays original. */}
                <image
                  href={plate}
                  width={spec.width}
                  height={spec.height}
                  data-clean-plate={name}
                />
                <image
                  href={src}
                  width={spec.width}
                  height={spec.height}
                  mask={`url(#${id}-background-mask)`}
                />
              </svg>
            )}
          </div>
        )}
      </div>
      {spec && (
        <svg
          className="depth-foreground"
          viewBox={viewBox}
          preserveAspectRatio={name === 'talk' ? 'xMinYMid slice' : 'xMidYMid slice'}
          aria-hidden="true"
          focusable="false"
        >
          {ready && (
            <>
              <defs>
                <filter id={`${id}-edge`} colorInterpolationFilters="sRGB">
                  <feComponentTransfer>
                    <feFuncA type="table" tableValues="0 0 0 0 0 0 0 0 0.05 1 1" />
                  </feComponentTransfer>
                </filter>
                <mask
                  id={`${id}-mask`}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width={spec.width}
                  height={spec.height}
                  style={{ maskType: 'alpha' }}
                >
                  <image
                    href={mask}
                    width={spec.maskWidth}
                    height={spec.maskHeight}
                    transform={`matrix(${spec.transform.join(' ')})`}
                    filter={`url(#${id}-edge)`}
                  />
                </mask>
              </defs>
              <image href={src} width={spec.width} height={spec.height} mask={`url(#${id}-mask)`} />
            </>
          )}
        </svg>
      )}
    </div>
  );
}
