import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { animations } from "@/utils/animations";

// Import new UI components
import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/ui/hero";
import { Section, SectionHeader, SectionGrid } from "@/components/ui/section";
import { CardFeature, FeatureGrid } from "@/components/ui/card-feature";
import { CallToAction } from "@/components/ui/cta";
import { TestimonialsSlider } from "@/components/ui/testimonials";
import { InstagramFeedContainer } from "@/components/ui/instagram-feed";
import { Footer } from "@/components/ui/footer";

// Import existing components
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";

// Import fonts
const fontUrl = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap";
const iconUrl = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";

export default function Home() {
  useEffect(() => {
    // Add fonts
    const fontLink = document.createElement("link");
    fontLink.href = fontUrl;
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    // Add icons
    const iconLink = document.createElement("link");
    iconLink.href = iconUrl;
    iconLink.rel = "stylesheet";
    iconLink.href = iconUrl;
    document.head.appendChild(iconLink);

    // Initialize animations
    const initAnimations = async () => {
      if (animations.initGSAP) {
        await animations.initGSAP();
      }
      await animations.initSmoothScroll();
    };

    initAnimations();

    return () => {
      // Clean up link tags
      document.head.removeChild(fontLink);
      document.head.removeChild(iconLink);
    };
  }, []);

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
  const services = [
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
  const testimonials = [
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
