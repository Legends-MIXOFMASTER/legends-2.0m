import React, { useEffect } from 'react';
import { animations } from '@/utils/animations';

// Import UI components
import { Navbar } from '@/components/ui/navbar';
import { Hero } from '@/components/ui/hero';
import { Section, SectionHeader } from '@/components/ui/section';
import { TeamMember, TeamGrid } from '@/components/ui/team-member';
import { CallToAction } from '@/components/ui/cta';
import { Footer } from '@/components/ui/footer';

export default function AboutPage() {
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

  // Team members data
  const teamMembers = [
    {
      name: "David Miller",
      role: "Founder & Head Mixologist",
      image: "/images/team/david-miller.jpg",
      bio: "With over 15 years of experience in the hospitality industry, David brings expertise and passion to every project."
    },
    {
      name: "Sarah Johnson",
      role: "Creative Director",
      image: "/images/team/sarah-johnson.jpg",
      bio: "Sarah leads our design and branding initiatives with a focus on creating memorable visual experiences."
    },
    {
      name: "Michael Brooks",
      role: "Operations Manager",
      image: "/images/team/michael-brooks.jpg",
      bio: "Michael ensures that every event runs smoothly from planning to execution."
    },
    {
      name: "Emma Wilson",
      role: "Lead Bartender",
      image: "/images/team/emma-wilson.jpg",
      bio: "Emma combines creativity and technical skill to craft innovative cocktails."
    }
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
        title="About Us"
        subtitle="Learn about our story, our team, and our passion for crafting exceptional experiences"
        backgroundImage="/images/about/about-hero.jpg"
        ctaButtons={{
          primary: { label: "Meet Our Team", href: "#team" },
          secondary: { label: "Our Services", href: "/services" }
        }}
      />
      
      {/* Our Story */}
      <Section id="story" className="bg-light py-20">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-elevated">
                <img 
                  src="/images/about/our-story.jpg" 
                  alt="Our Story" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-display font-bold mb-6">Our Story</h2>
              <p className="text-neutral-700 mb-6">
                Founded in 2015, Legends of Cocktails began as a small passion project by our founder, David Miller. With a vision to elevate Namibia's cocktail culture, David assembled a team of like-minded professionals dedicated to crafting exceptional beverage experiences.
              </p>
              <p className="text-neutral-700 mb-6">
                What started as mobile bar services for private events quickly grew into a comprehensive hospitality collective. Today, under the House of Legends umbrella, we offer a diverse range of services including mobile bars, mixology workshops, menu consulting, and professional training through our specialized brands.
              </p>
              <p className="text-neutral-700">
                Our commitment to quality, innovation, and exceptional service has made us Namibia's premier cocktail and hospitality provider, trusted by individuals, corporations, and venues across the country.
              </p>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Our Values */}
      <Section id="values" className="bg-white py-20">
        <SectionHeader 
          title="Our Values"
          subtitle="Principles that guide everything we do"
          centered
        />
        <div className="container mx-auto max-w-7xl mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-light p-8 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Excellence</h3>
              <p className="text-neutral-700">
                We are relentless in our pursuit of excellence in every aspect of our business, from the quality of our ingredients to the professionalism of our service.
              </p>
            </div>
            
            <div className="bg-light p-8 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Innovation</h3>
              <p className="text-neutral-700">
                We constantly push boundaries and explore new ideas to create unique, memorable experiences that surprise and delight our clients.
              </p>
            </div>
            
            <div className="bg-light p-8 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Integrity</h3>
              <p className="text-neutral-700">
                We operate with complete transparency and honesty in all our dealings, building trust with our clients, partners, and team members.
              </p>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Team Section */}
      <Section id="team" className="bg-light py-20">
        <SectionHeader 
          title="Meet Our Team"
          subtitle="The passionate professionals behind our success"
          centered
        />
        <div className="container mx-auto max-w-7xl mt-12">
          <TeamGrid columns={4}>
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                bio={member.bio}
              />
            ))}
          </TeamGrid>
        </div>
      </Section>
      
      {/* Join Us CTA */}
      <Section className="bg-primary text-white py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Join Our Team</h2>
          <p className="text-xl opacity-90 mb-8">
            Looking to be part of a dynamic team passionate about hospitality? We're always seeking talented individuals to join us.
          </p>
          <CallToAction
            label="View Careers"
            href="/careers"
            variant="outline"
            size="lg"
          />
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
