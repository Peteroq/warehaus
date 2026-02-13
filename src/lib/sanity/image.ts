import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';
import type { SanityImage } from './types';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

export function responsiveImageProps(source: SanityImage, alt: string = '') {
  const base = urlFor(source).auto('format');

  return {
    src: base.width(800).url(),
    srcSet: [
      `${base.width(400).url()} 400w`,
      `${base.width(800).url()} 800w`,
      `${base.width(1200).url()} 1200w`,
    ].join(', '),
    sizes: '(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px',
    alt,
  };
}
