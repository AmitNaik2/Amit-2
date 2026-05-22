// C:/Users/Amit/antigravity/gamesdealshub-next/src/app/sitemap.ts
import { MetadataRoute } from 'next';

// Fix 8: Auto-generated sitemap.xml
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.gamesdealshub.me/', lastModified: new Date(), changeFrequency: 'hourly', priority: 1.0 },
    { url: 'https://www.gamesdealshub.me/archive', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://www.gamesdealshub.me/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://www.gamesdealshub.me/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://www.gamesdealshub.me/privacy', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://www.gamesdealshub.me/terms', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 }
  ];
}
