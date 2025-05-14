import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HouseOfLegends from "@/components/HouseOfLegends";
import LegendsOfCocktails from "@/components/LegendsOfCocktails";
import NamibianBarMasters from "@/components/NamibianBarMasters";
import BookingSection from "@/components/BookingSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Import fonts
const fontUrl = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Lato:wght@300;400;700&display=swap";
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
    document.head.appendChild(iconLink);

    // Add meta tags
    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content = "House of Legends - Namibia's premier cocktail and hospitality collective, offering exceptional experiences through our specialized brands.";
    document.head.appendChild(metaDesc);

    // Set page title
    document.title = "House of Legends | Premium Hospitality Services";

    // Cleanup
    return () => {
      document.head.removeChild(fontLink);
      document.head.removeChild(iconLink);
      document.head.removeChild(metaDesc);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HouseOfLegends />
      <LegendsOfCocktails />
      <NamibianBarMasters />
      <BookingSection />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
}
