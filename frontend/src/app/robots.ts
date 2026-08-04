import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://modliq-io.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
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
        ],
        disallow: [
          '/admin',
          '/api',
          '/dashboard',
          '/data-upload',
          '/goal',
          '/results',
          '/studio',
          '/operations',
          '/supply-chain',
          '/lean',
          '/quality-passport',
          '/*/modliq-console',
          '/share',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
