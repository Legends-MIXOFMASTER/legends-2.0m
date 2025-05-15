import { Hero } from '@/components/sections/Hero';
import { Navbar } from '@/components/layout/Navbar';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { CallToAction } from '@/components/ui/CallToAction';
import { FeatureGrid } from '@/components/ui/FeatureGrid';
import { TestimonialsSlider } from '@/components/ui/TestimonialsSlider';
import { Footer } from '@/components/layout/Footer';
import BookingSection from '@/components/BookingSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
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
    { label: "Book", href: "#booking", highlight: true },
  ];

  // Features for the service section
  const serviceItems = [
    {
      title: "Bar Services",
      description: "Comprehensive bar services for weddings, corporate events, and private parties.",
      image: "/images/services/bar-service.jpg",
    },
    {
      title: "Mixology Workshops",
      description: "Learn the art of mixology with our expert-led workshops. Perfect for team building.",
      image: "/images/services/mixology-workshop.jpg",
    },
    {
      title: "Cocktail Menu Design",
      description: "Custom cocktail menu creation tailored to your brand and audience preferences.",
      image: "/images/services/menu-design.jpg",
    },
  ];

  // Testimonials data
  const testimonialItems = [
    {
      author: "Jane Cooper",
      role: "Event Coordinator",
      company: "XYZ Events",
      avatar: "/images/testimonials/jane-cooper.jpg",
      content: "The team at Legends of Cocktails exceeded our expectations. Their attention to detail and creativity made our corporate event truly memorable.",
      rating: 5,
    },
    {
      author: "Marcus Johnson",
      role: "Marketing Director",
      company: "Brand Solutions",
      avatar: "/images/testimonials/marcus-johnson.jpg",
      content: "Their mixology workshops were a hit with our team. The perfect blend of education and entertainment.",
      rating: 5,
    },
  ];

  // Footer navigation
  const footerNavigation = navItems.map(({ label, href }) => ({ label, href }));

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar items={navItems} />

      <Hero
        title="Crafting Unforgettable Cocktail Experiences"
        subtitle="From private events to corporate gatherings, we bring the art of mixology to your special occasions."
        ctaButtons={{
          primary: { label: "Book Now", href: "#booking" },
          secondary: { label: "Our Services", href: "#services" },
        }}
      />

      <Section id="about" className="bg-light py-20">
        <SectionHeader
          title="About Legends of Cocktails"
          subtitle="Namibia's Premier Cocktail Service"
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          <div className="rounded-lg overflow-hidden shadow-elevated">
            <img
              src="/images/about/team.jpg"
              alt="Legends of Cocktails Team"
              className="w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-4">Our Journey</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6">
              Founded in 2015, Legends of Cocktails has grown from a small passion project into Namibia's premier cocktail service.
              We combine traditional techniques with innovative approaches to create unforgettable experiences for our clients.
            </p>
            <CallToAction
              label="Learn More About Us"
              href="/about"
              variant="outline"
              size="md"
            />
          </div>
        </div>
      </Section>

      <Section id="services" className="bg-white dark:bg-neutral-800 py-20">
        <SectionHeader
          title="Our Services"
          subtitle="Professional cocktail solutions tailored to your unique needs"
          centered
        />
        <div className="mt-12">
          <FeatureGrid features={serviceItems} columns={3} />
        </div>
      </Section>

      <Section id="booking" className="bg-light dark:bg-neutral-900 py-20">
        <SectionHeader
          title="Book Your Experience"
          subtitle="Let us help make your next event extraordinary"
          centered
        />
        <div className="mt-12">
          <BookingSection />
        </div>
      </Section>

      <Section id="testimonials" className="bg-white dark:bg-neutral-800 py-20">
        <SectionHeader
          title="What Our Clients Say"
          subtitle="Don't just take our word for it"
          centered
        />
        <div className="mt-12">
          <TestimonialsSlider testimonials={testimonialItems} />
        </div>
      </Section>

      <Section id="contact" className="bg-light dark:bg-neutral-900 py-20">
        <SectionHeader
          title="Get in Touch"
          subtitle="Have questions? We're here to help"
          centered
        />
        <div className="mt-12">
          <ContactSection />
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
      content: "Working with Legends of Cocktails has been a game-changer for our product launches. Their mixology expertise adds a unique touch to our events.",
      rating: 5,
    },
    {
      author: "Sarah Mitchell",
      role: "Wedding Planner",
      company: "Dream Weddings",
      avatar: "/images/testimonials/sarah-mitchell.jpg",
      content: "My clients have been consistently impressed by the professionalism and creativity of the Legends team. Their signature cocktails are always a hit!",
      rating: 5,
    },
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar logo="/images/logo.png" items={navItems} />
      
      <Hero 
        title="Crafting Unforgettable Experiences"
        subtitle="Premium cocktail services for events that leave a lasting impression"
        backgroundImage="/images/hero-bg.jpg"
        ctaButtons={{
          primary: { label: "Book Now", href: "#booking" },
          secondary: { label: "Our Services", href: "/services" }
        }}
      />
      
      <Section id="about" className="bg-light py-20">
        <SectionHeader 
          title="About Legends of Cocktails"
          subtitle="Where passion meets precision to create extraordinary cocktail experiences"
          centered
        />
        <div className="container mx-auto max-w-7xl mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-elevated">
              <img 
                src="/images/about/team.jpg" 
                alt="Legends of Cocktails Team" 
                className="w-full object-cover" 
              />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold mb-4">Our Journey</h3>
              <p className="text-neutral-700 mb-6">
                Founded in 2015, Legends of Cocktails has grown from a small passion project into Namibia's premier cocktail service. 
                We combine traditional techniques with innovative approaches to create unforgettable experiences for our clients.
              </p>
              <p className="text-neutral-700 mb-6">
                Our team of experienced mixologists and bar professionals are dedicated to crafting exceptional cocktails and providing outstanding service.
              </p>
              <CallToAction 
                label="Learn More About Us"
                href="/about"
                variant="outline"
                size="md"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section id="services" className="bg-white py-20">
        <SectionHeader 
          title="Our Services"
          subtitle="Professional cocktail solutions tailored to your unique needs"
          centered
        />
        <div className="container mx-auto max-w-7xl mt-12">
          <FeatureGrid features={services} columns={3} />
          <div className="text-center mt-12">
            <CallToAction 
              label="View All Services"
              href="/services"
              variant="primary"
              size="lg"
            />
          </div>
        </div>
      </Section>
      
      <Section id="booking" className="bg-light py-20">
        <SectionHeader 
          title="Book Your Experience"
          subtitle="Let us help make your next event extraordinary"
          centered
        />
        <div className="container mx-auto max-w-5xl mt-12">
          <BookingSection />
        </div>
      </Section>

      <Section id="testimonials" className="bg-white py-20">
        <SectionHeader 
          title="What Our Clients Say"
          subtitle="Don't just take our word for it"
          centered
        />
        <div className="container mx-auto max-w-6xl mt-12">
          <TestimonialsSlider testimonials={testimonials} />
        </div>
      </Section>

      <InstagramFeedContainer 
        title="Follow Our Journey"
        subtitle="See our latest creations and behind-the-scenes moments"
        username="legendsofcocktails"
        count={8}
        columns={4}
        showCaption={true}
      />
      
      <Section id="contact" className="bg-light py-20">
        <SectionHeader 
          title="Get in Touch"
          subtitle="Have questions? We're here to help"
          centered
        />
        <div className="container mx-auto max-w-5xl mt-12">
          <ContactSection />
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
