// C:/Users/Amit/antigravity/gamesdealshub-next/src/components/DealCard.tsx
import Image from 'next/image';
import { Deal } from '@/types/deal';
import { CountdownTimer } from './CountdownTimer';

// Fix 14 & 10: Deal card with next/image, CTA button, CountdownTimer, and platform badge
export function DealCard({ deal, priority = false }: { deal: Deal, priority?: boolean }) {
  // Fix 14: Platform-branded CTA labels
  const getButtonLabel = (platforms: string) => {
    const platformStr = platforms.toLowerCase();
    if (platformStr.includes('epic')) return 'Claim free on Epic Games';
    if (platformStr.includes('steam')) return 'Get free on Steam';
    if (platformStr.includes('gog')) return 'Grab free on GOG';
    if (platformStr.includes('prime')) return 'Claim on Prime Gaming';
    return `Claim on ${platforms}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full border border-gray-100">
      <div className="relative h-48 w-full bg-gray-200">
        <Image
          src={deal.image || deal.thumbnail}
          alt={deal.title}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
          <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
            {deal.platforms}
          </span>
          {deal.end_date && deal.end_date !== 'N/A' && (
            <CountdownTimer expiryDate={deal.end_date} />
          )}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2" title={deal.title}>
          {deal.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
          {deal.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 line-through">{deal.worth !== 'N/A' ? deal.worth : ''}</span>
            <span className="text-lg font-bold text-green-600">Free</span>
          </div>
          
          <a 
            href={deal.open_giveaway_url || deal.gamerpower_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors text-center shadow-sm"
          >
            {getButtonLabel(deal.platforms)}
          </a>
        </div>
      </div>
    </div>
  );
}
