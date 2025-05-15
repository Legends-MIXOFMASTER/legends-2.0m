import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import { animations } from '@/utils/animations';

// Import global styles
import '@/styles/globals.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  // Initialize animations and scroll behavior (with fallbacks for missing dependencies)
  useEffect(() => {
    const initAnimations = async () => {
      try {
        // Try to initialize animations, but continue if they fail
        if (animations.initGSAP) {
          await animations.initGSAP();
        }
        
        try {
          await animations.initSmoothScroll();
        } catch (error) {
          console.log('Smooth scrolling not available');
        }
        
        // Log animation status for debugging
        if (animations.isAvailable && animations.isAvailable()) {
          console.log('Advanced animations are enabled');
        } else {
          console.log('Using basic animations only (GSAP not available)');
        }
      } catch (error) {
        console.log('Animation initialization failed - using fallbacks');
      }
    };

    initAnimations();
    
    // Set default page title and description
    if (!document.title) {
      document.title = 'Legends of Cocktails | Premium Mobile Bar Services in Namibia';
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Legends of Cocktails provides premium mobile bar services, mixology workshops, and bartender training in Namibia. Elevate your events with our exceptional cocktail experiences." />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Legends of Cocktails | Premium Cocktail Experiences" />
        <meta property="og:description" content="Elevate your events with our premium mobile bar services, mixology workshops, and bartender training." />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://legendsofcocktails.com" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Legends of Cocktails | Premium Cocktail Experiences" />
        <meta name="twitter:description" content="Elevate your events with premium cocktail services in Namibia." />
        <meta name="twitter:image" content="/images/og-image.jpg" />
        
        {/* Preload fonts */}
        <link
          rel="preload"
          href="/fonts/montserrat.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/playfair-display.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
