import { LayeredImage } from './cutout';
import layers from '@/lib/photo-layers.json';
export function Photo({
  name,
  alt,
  className = '',
}: {
  name: string;
  alt: string;
  className?: string;
}) {
  const src = name.startsWith('/') ? name : `/media/${name}.webp`;
  const key = name
    .split('/')
    .pop()!
    .replace(/\.(webp|jpg|png)$/, '');
  const hasLayer = key in layers;
  return (
    <figure className={`depth-photo ${hasLayer ? 'has-cutout' : ''} ${className}`} data-depth>
      <LayeredImage name={key} src={src} alt={alt} />
      <span className="photo-edge" aria-hidden="true" />
    </figure>
  );
}
