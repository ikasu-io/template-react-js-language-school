import images from '../data/images';

// A photo by its name in src/data/images.js.
export default function Photo({ name, sizes = '100vw', eager = false, className }) {
  const photo = images[name];
  if (!photo) return null;
  return (
    <img
      className={className}
      src={photo.src}
      srcSet={photo.srcset}
      sizes={sizes}
      width={photo.w}
      height={photo.h}
      alt={photo.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
    />
  );
}
