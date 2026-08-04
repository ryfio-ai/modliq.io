import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://modliq-io.vercel.app';

  const pages = [
    '',
    '/about',
    '/features',
    '/docs',
    '/comparison',
    '/workflow',
    '/system-architecture',
    '/pricing',
    '/contact',
    '/roi',
    '/privacy',
    '/terms',
  ];

  return pages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : 0.7,
  }));
}
