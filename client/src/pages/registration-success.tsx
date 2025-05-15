import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { animations } from '@/utils/animations';

// Import UI components
import { Navbar } from '@/components/ui/navbar';
import { Section } from '@/components/ui/section';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function RegistrationSuccess() {
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
    
    // Set up page title and meta description
    document.title = "Registration Successful | House of Legends";
    
    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content = "Your registration was successful. Welcome to the House of Legends family!";
    document.head.appendChild(metaDesc);
    
    return () => {
      document.head.removeChild(metaDesc);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar logo="/images/logo.png" items={navItems} />
      
      <Section className="flex-grow flex items-center justify-center py-16 bg-light">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="bg-white rounded-xl shadow-card overflow-hidden p-10 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-display font-bold text-primary mb-4">Registration Successful!</h1>
            
            <p className="text-lg text-neutral-700 mb-8">
              Welcome to House of Legends! Your account has been created successfully and you are now logged in.
            </p>
            
            <div className="space-y-4">
              <Button asChild size="lg" className="w-full">
                <Link href="/account">
                  View Your Account
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/#booking">
                  Book Your First Service
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 text-sm text-neutral-500">
              <p>Need help getting started? Check out our <Link href="/guide" className="text-accent hover:underline">new user guide</Link> or <Link href="/contact" className="text-accent hover:underline">contact us</Link>.</p>
            </div>
          </div>
        </div>
      </Section>
      
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
