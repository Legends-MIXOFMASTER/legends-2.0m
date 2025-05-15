import React, { useEffect } from 'react';
import { animations } from '@/utils/animations';

// Import UI components
import { Navbar } from '@/components/ui/navbar';
import { Hero } from '@/components/ui/hero';
import { Section, SectionHeader } from '@/components/ui/section';
import { ServiceCard, ServiceGrid } from '@/components/ui/service-card';
import { CallToAction } from '@/components/ui/cta';
import { Footer } from '@/components/ui/footer';

export default function ServicesPage() {
  // Navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about", children: [
      { label: "Legends of Cocktails", href: "/about/legends-of-cocktails" },
      { label: "House of Legends", href: "/about/house-of-legends" },
      { label: "Namibian Bar Masters", href: "/about/namibian-bar-masters" },
    ]},
    { label: "Services", href: "/services" },
    { label: "Events", href: "/events" },
    { label: "Book", href: "/#booking", highlight: true },
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

  useEffect(() => {
    // Initialize animations
    const initAnimations = async () => {
      if (animations.initGSAP) {
        await animations.initGSAP();
      }
      await animations.initSmoothScroll();
    };

    initAnimations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar logo="/images/logo.png" items={navItems} />
      
      <Hero 
        title="Our Services"
        subtitle="Comprehensive cocktail solutions tailored to your specific needs"
        backgroundImage="/images/services/services-hero.jpg"
        ctaButtons={{
          primary: { label: "Get in Touch", href: "/#contact" },
          secondary: { label: "View Pricing", href: "/pricing" }
        }}
      />
      
      {/* Main Services */}
      <Section id="bar-services" className="bg-light py-20">
        <SectionHeader 
          title="Bar Services"
          subtitle="End-to-end mobile bar solutions for events of any size"
          centered
        />
        <div className="container mx-auto max-w-7xl mt-12">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-elevated">
                <img 
                  src="/images/services/mobile-bar.jpg" 
                  alt="Mobile Bar Services" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-display font-bold mb-4">Mobile Bar Solutions</h3>
              <p className="text-neutral-700 mb-6">
                Whether you're planning an intimate gathering or a large-scale corporate event, our mobile bar services provide a complete solution for your beverage needs. 
                Our experienced team handles everything from initial design to final service.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-accent mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Custom bar design and branding options</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-accent mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Professional bartenders and service staff</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-accent mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Bespoke menu creation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-accent mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Premium glassware and equipment</span>
                </li>
              </ul>
              
              <CallToAction
                label="Book Bar Services"
                href="/#booking"
                variant="primary"
                size="md"
              />
            </div>
          </div>
        </div>
      </Section>
      
      {/* Service Cards */}
      <Section id="other-services" className="bg-white py-20">
        <SectionHeader 
          title="Specialized Services"
          subtitle="Explore our range of additional offerings"
          centered
        />
        <div className="container mx-auto max-w-7xl mt-12">
          <ServiceGrid columns={3}>
            <ServiceCard
              title="Mixology Workshops"
              description="Interactive and educational workshops for corporate teams or private groups. Learn techniques from our expert mixologists and craft your own signature drinks."
              image="/images/services/mixology-workshop.jpg"
              actionLabel="Learn More"
              actionHref="/services/workshops"
            />
            
            <ServiceCard
              title="Menu Design & Consulting"
              description="Elevate your bar program with our professional consulting services. We'll help you design menus, train staff, and optimize operations."
              image="/images/services/menu-design.jpg"
              actionLabel="Learn More"
              actionHref="/services/consulting"
            />
            
            <ServiceCard
              title="Brand Activations"
              description="Create memorable experiences for your brand with our activation services. We'll handle everything from concept development to execution."
              image="/images/services/brand-activation.jpg"
              actionLabel="Learn More"
              actionHref="/services/activations"
            />
            
            <ServiceCard
              title="Equipment Rentals"
              description="Rent premium bar equipment, glassware, and accessories for your DIY events. All rentals include delivery, setup, and pickup."
              image="/images/services/equipment-rental.jpg"
              actionLabel="View Equipment"
              actionHref="/services/equipment"
            />
            
            <ServiceCard
              title="Staff Training"
              description="Professional training for your bar and service staff. Elevate your team's skills with hands-on instruction from industry experts."
              image="/images/services/staff-training.jpg"
              actionLabel="Training Options"
              actionHref="/services/training"
            />
            
            <ServiceCard
              title="Freelance Bartending"
              description="Join our network of freelance professionals for flexible work opportunities at premium events across Namibia."
              image="/images/services/freelance.jpg"
              actionLabel="Register Now"
              actionHref="/services/freelance"
            />
          </ServiceGrid>
        </div>
      </Section>
      
      {/* Pricing CTA */}
      <Section className="bg-primary text-white py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to elevate your next event?</h2>
          <p className="text-xl opacity-90 mb-8">
            Contact us for a personalized quote tailored to your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallToAction
              label="View Pricing"
              href="/pricing"
              variant="outline"
              size="lg"
            />
            <CallToAction
              label="Get in Touch"
              href="/#contact"
              variant="secondary"
              size="lg"
            />
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
