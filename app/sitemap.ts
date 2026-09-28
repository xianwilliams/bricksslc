import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bricksslc.com';
  return [
    '',
    'memberships',
    'businessclub',
    'carclub',
    'socialclub',
    'outside-marketing',
    'events',
    'content-strategy',
    'about-us',
    'members',
    'bricks-art',
    'contact',
    'copy-of-founder-page',
    'book-online',
    'terms',
    'privacy',
    'event-details/bricks-kickoff',
    'service-page/business-workshop',
    'service-page/exotic-car-club-storage',
    'service-page/social-club-meetup',
  ].map((path) => ({
    url: `${base}/${path}`,
    changeFrequency: path === 'events' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
