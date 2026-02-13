import type { PortableTextBlock } from '@portabletext/react';

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  color?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  client?: string;
  year?: number;
  description?: string;
  body?: PortableTextBlock[];
  coverImage?: SanityImage;
  gallery?: SanityImage[];
  categories?: Category[];
  services?: string[];
  featured?: boolean;
  order?: number;
  color?: string;
  modelUrl?: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: SanityImage;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

export interface SiteSettings {
  studioName: string;
  tagline?: string;
  email?: string;
  phone?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  seo?: {
    title?: string;
    description?: string;
    ogImage?: SanityImage;
  };
}
