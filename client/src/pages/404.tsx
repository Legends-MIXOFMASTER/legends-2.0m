import React, { useEffect } from 'react';
import Link from 'next/link';
import { animations } from '@/utils/animations';

// Import UI components
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';

export default function NotFoundPage() {
  // Navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Book", href: "/#booking" },
  ];

  // Footer navigation
  const footerNavigation = [
    {
      title: "Company",
      items: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      items: [
        { label: "Bar Services", href: "/services/bar-services" },
        { label: "Mixology Workshops", href: "/services/workshops" },
        { label: "Menu Design", href: "/services/menu-design" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  // Initialize animations
  useEffect(() => {
    const initAnimations = async () => {
      if (animations.initGSAP) {
        await animations.initGSAP();
      }
      await animations.initSmoothScroll();
    };

    initAnimations();
    
    // Set page title
    document.title = "Page Not Found | Legends of Cocktails";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar logo="/images/logo.png" items={navItems} />
      
      {/* 404 Content */}
      <Section className="flex-grow flex items-center justify-center py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-display font-bold text-primary">404</h1>
          </div>
          
          <div className="max-w-lg mx-auto">
            <h2 className="text-3xl font-display font-bold mb-4">Page Not Found</h2>
            <p className="text-xl text-neutral-600 mb-8">
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/">
                  Return Home
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link href="/services">
                  Explore Our Services
                </Link>
              </Button>
            </div>
            
            <div className="mt-12">
              <p className="text-neutral-500">
                Need assistance? <Link href="/contact" className="text-accent hover:underline">Contact us</Link>
              </p>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="mt-16 relative">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="text-primary/10">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Footer */}
      <Footer 
        logo="/images/logo-white.png"
        tagline="Crafting unforgettable cocktail experiences since 2015"
        navigation={footerNavigation}
        contactInfo={{
          email: "info@legendsofcocktails.com",
          phone: "+264 81 234 5678",
          address: "10 Independence Avenue, Windhoek, Namibia"
        }}
      />
    </div>
  );
}
