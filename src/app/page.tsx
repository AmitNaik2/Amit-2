import { fetchDeals } from "@/lib/fetchDeals";
import { DealGrid } from "@/components/DealGrid";
import { DealStats } from "@/components/DealStats";

// Fix 1: ISR revalidation for the homepage
export const revalidate = 300; // 5 minutes

export default async function Home() {
  const deals = await fetchDeals();

  // Fix 9: ItemList + Offer schema for deal listings
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free PC Games & Deals",
    url: "https://www.gamesdealshub.me",
    itemListElement: deals.map((deal, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: deal.title,
        image: deal.image || deal.thumbnail,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          url: deal.open_giveaway_url || deal.gamerpower_url,
          availability: "https://schema.org/InStock",
          priceValidUntil: deal.end_date !== 'N/A' ? deal.end_date : undefined,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <section className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Live Free Games</h2>
            <p className="text-gray-600">Claim these free games before they expire.</p>
          </div>
          <DealStats totalDeals={deals.length} />
        </div>
        
        <DealGrid initialDeals={deals} />
      </section>
    </>
  );
}
