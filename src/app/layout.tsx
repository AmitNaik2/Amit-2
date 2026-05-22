import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fixes 2, 3, 4, 5, 6: Global Metadata with Open Graph and Twitter Cards
export const metadata: Metadata = {
  metadataBase: new URL("https://www.gamesdealshub.me"),
  title: "GamesDealsHub | Free PC Games & Deals — Updated Daily",
  description: "Track and claim free PC games before they expire. Updated daily with the latest Epic Games, Steam, and GOG freebies.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GamesDealsHub | Free PC Games & Deals",
    description: "Track and claim free PC games before they expire.",
    url: "https://www.gamesdealshub.me/",
    siteName: "GamesDealsHub",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "GamesDealsHub" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GamesDealsHub | Free PC Games & Deals",
    description: "Track and claim free PC games before they expire.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fix 9: Sitewide WebSite schema with SearchAction
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GamesDealsHub",
    url: "https://www.gamesdealshub.me",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.gamesdealshub.me/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        {/* Fix 10: GTM loaded after page is interactive */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KJMQXBNW');
          `}
        </Script>
        
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KJMQXBNW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              GamesDealsHub
            </h1>
            <nav className="flex gap-4">
              <a href="/" className="text-sm font-medium hover:text-purple-600 transition-colors">Deals</a>
              <a href="/archive" className="text-sm font-medium hover:text-purple-600 transition-colors">Archive</a>
              <a href="/about" className="text-sm font-medium hover:text-purple-600 transition-colors">About</a>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>

        <footer className="bg-gray-900 text-gray-400 py-8 text-center mt-auto">
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
            <div className="flex gap-4 text-sm">
              <a href="/about" className="hover:text-white">About Us</a>
              <a href="/contact" className="hover:text-white">Contact</a>
              <a href="/privacy" className="hover:text-white">Privacy Policy</a>
              <a href="/terms" className="hover:text-white">Terms of Service</a>
            </div>
            <p className="text-xs">&copy; {new Date().getFullYear()} GamesDealsHub. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
