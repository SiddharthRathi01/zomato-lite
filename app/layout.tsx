import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ReviewsProvider } from '@/lib/reviews-context';

export const metadata: Metadata = {
  title: 'Zomato Lite',
  description: 'A refined restaurant discovery and review prototype inspired by Zomato.',
  openGraph: {
    title: 'Zomato Lite',
    description: 'A refined restaurant discovery and review prototype inspired by Zomato.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ReviewsProvider>
          <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] flex flex-col font-sans selection:bg-[#E23744]/20 selection:text-[#1C1C1C]">
            <Header />
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              {children}
            </main>
            <Footer />
          </div>
        </ReviewsProvider>
      </body>
    </html>
  );
}
