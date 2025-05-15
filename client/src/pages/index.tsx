import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animations } from '@/utils/animations';

// Import UI components
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Hero } from '@/components/ui/hero';
import { Section, SectionHeader } from '@/components/ui/section';
import { ServiceCard } from '@/components/ui/service-card';
import { TestimonialsSlider } from '@/components/ui/testimonials-slider';
import { InstagramFeed } from '@/components/ui/instagram-feed';
import { CallToAction } from '@/components/ui/cta';
import { BookingSection } from '@/components/BookingSection';

// Icons
import { Cocktail, Users, Award, Clock, Lightbulb } from 'lucide-react';

export default function HomePage() {
  // Refs for animations
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Navigation items
  const navItems = [
    { label: "Home", href: "/", active: true },
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

  // Stats data
  const stats = [
    { icon: <Cocktail className="h-8 w-8 text-primary" />, value: "5,000+", label: "Cocktails Crafted" },
    { icon: <Users className="h-8 w-8 text-primary" />, value: "250+", label: "Happy Clients" },
    { icon: <Award className="h-8 w-8 text-primary" />, value: "12", label: "Industry Awards" },
    { icon: <Clock className="h-8 w-8 text-primary" />, value: "8", label: "Years of Excellence" },
  ];

  // Services data
  const services = [
    {
      title: "Mobile Bar Services",
      description: "Custom-built mobile bars with professional bartenders for events of any size.",
      image: "/images/services/mobile-bar.jpg",
      icon: <Cocktail className="h-6 w-6" />,
      href: "/services/mobile-bar",
    },
    {
      title: "Corporate Events",
      description: "Elevate your corporate events with our premium cocktail experiences.",
      image: "/images/services/corporate.jpg",
      icon: <Users className="h-6 w-6" />,
      href: "/services/corporate",
    },
    {
      title: "Mixology Workshops",
      description: "Interactive cocktail classes and team building experiences.",
      image: "/images/services/workshop.jpg",
      icon: <Lightbulb className="h-6 w-6" />,
      href: "/services/workshops",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "The Legends of Cocktails team exceeded our expectations. Their attention to detail and innovative cocktails made our wedding truly special.",
      author: "Sarah & Michael",
      role: "Wedding Clients",
      image: "/images/testimonials/client1.jpg",
    },
    {
      quote: "We've worked with Legends for all our corporate events for the past 3 years. Their professionalism and creativity are unmatched.",
      author: "Johanna Muller",
      role: "Event Director, NamCorp",
      image: "/images/testimonials/client2.jpg",
    },
    {
      quote: "The mixology workshop was both educational and incredibly fun. Our team still talks about it months later!",
      author: "Thomas Kruger",
      role: "Team Lead, TechStart Namibia",
      image: "/images/testimonials/client3.jpg",
    },
  ];

  // Brand logos
  const brands = [
    { name: "House of Legends", logo: "/images/brands/hol-logo.png" },
    { name: "Legends of Cocktails", logo: "/images/brands/loc-logo.png" },
    { name: "Namibia Bartending Academy", logo: "/images/brands/nba-logo.png" },
  ];

  // Instagram feed images
  const instagramImages = [
    { src: "/images/instagram/cocktail1.jpg", alt: "Signature cocktail creation" },
    { src: "/images/instagram/event1.jpg", alt: "Corporate event setup" },
    { src: "/images/instagram/bartender1.jpg", alt: "Expert bartender in action" },
    { src: "/images/instagram/cocktail2.jpg", alt: "Colorful cocktail presentation" },
    { src: "/images/instagram/event2.jpg", alt: "Outdoor wedding bar" },
    { src: "/images/instagram/workshop1.jpg", alt: "Mixology workshop in progress" },
  ];

  // Initialize animations
  useEffect(() => {
    const initAnimations = async () => {
      if (animations.initGSAP) {
        await animations.initGSAP();
      }
      await animations.initSmoothScroll();
      
      gsap.registerPlugin(ScrollTrigger);
      
      // Stats counter animation
      if (statsRef.current) {
        const statsItems = statsRef.current.querySelectorAll('.stat-item');
        
        gsap.from(statsItems, {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        });
      }
      
      // Services cards animation
      if (servicesRef.current) {
        const cards = servicesRef.current.querySelectorAll('.service-card');
        
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          stagger: 0.2,
          duration: 0.7,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          }
        });
      }
      
      // Brands animation
      if (brandsRef.current) {
        const brands = brandsRef.current.querySelectorAll('.brand-item');
        
        gsap.from(brands, {
          scale: 0.8,
          opacity: 0,
          stagger: 0.15,
          duration: 0.5,
          scrollTrigger: {
            trigger: brandsRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          }
        });
      }
    };

    initAnimations();
    
    // Cleanup
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar logo="/images/logo.png" items={navItems} />
      
      {/* Hero Section */}
      <Hero
        title="Crafting Unforgettable Cocktail Experiences"
        subtitle="Elevate your events with premium mobile bar services, mixology workshops, and bartender training in Namibia."
        imageSrc="/images/hero-bg.jpg"
        cta={{
          primary: {
            label: "Book Now",
            href: "#booking"
          },
          secondary: {
            label: "Explore Services",
            href: "/services"
          }
        }}
        overlay="dark"
        fullHeight
      />
      
      {/* Stats Section */}
      <Section className="py-16 bg-light">
        <div className="container mx-auto">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-display font-bold text-primary mb-1">{stat.value}</h3>
                <p className="text-neutral-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* Services Section */}
      <Section className="py-24">
        <div className="container mx-auto">
          <SectionHeader
            title="Our Premium Services"
            subtitle="From mobile bar setups to mixology workshops, we offer a range of services to elevate your experience."
            centered
          />
          
          <div ref={servicesRef} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  icon={service.icon}
                  href={service.href}
                />
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <CallToAction
              label="View All Services"
              href="/services"
              variant="secondary"
            />
          </div>
        </div>
      </Section>
      
      {/* Brands Section */}
      <Section className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto">
          <SectionHeader
            title="Our Brands"
            subtitle="A family of brands delivering excellence in the beverage industry across Namibia"
            centered
            light
          />
          
          <div ref={brandsRef} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
            {brands.map((brand, index) => (
              <div key={index} className="brand-item flex flex-col items-center p-6">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-16 md:h-20 mb-4 object-contain" 
                />
                <h3 className="text-xl font-medium text-center">{brand.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* Testimonials Section */}
      <Section className="py-24 bg-light">
        <div className="container mx-auto">
          <SectionHeader
            title="What Our Clients Say"
            subtitle="Hear from the people who have experienced our services"
            centered
          />
          
          <div ref={testimonialsRef} className="mt-12">
            <TestimonialsSlider testimonials={testimonials} />
          </div>
        </div>
      </Section>
      
      {/* Instagram Feed */}
      <Section className="py-20">
        <div className="container mx-auto">
          <SectionHeader
            title="Follow Our Journey"
            subtitle="Join us on Instagram for cocktail inspiration and behind-the-scenes looks"
            centered
          />
          
          <div className="mt-12">
            <InstagramFeed 
              images={instagramImages} 
              username="legendsofcocktails" 
              columns={3}
            />
          </div>
        </div>
      </Section>
      
      {/* Booking Section */}
      <BookingSection />
      
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
