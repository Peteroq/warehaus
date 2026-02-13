import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/react';
import { urlFor } from './image';
import type { SanityImage } from './types';

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 font-display text-2xl font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 font-display text-xl font-semibold">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-foreground/80">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-2 border-accent pl-4 italic text-muted">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline transition-colors hover:text-accent/80"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImage & { alt?: string } }) => (
      <figure className="my-6">
        <img
          src={urlFor(value).width(1200).auto('format').url()}
          alt={value.alt || ''}
          loading="lazy"
          className="w-full rounded-lg"
        />
      </figure>
    ),
  },
};

interface PortableTextRendererProps {
  content: PortableTextBlock[];
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  return <PortableText value={content} components={components} />;
}
