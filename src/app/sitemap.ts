import type { MetadataRoute } from 'next';
import { seo } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: seo.canonical,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
