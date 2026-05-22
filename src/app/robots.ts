// C:/Users/Amit/antigravity/gamesdealshub-next/src/app/robots.ts
import { MetadataRoute } from 'next';

// Fix 7: Auto-generated robots.txt with sitemap reference
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://www.gamesdealshub.me/sitemap.xml'
  };
}
