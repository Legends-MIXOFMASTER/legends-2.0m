import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { cocktailServiceImages, brandLogos } from "@/lib/assets";

export default function HouseOfLegendsAbout() {
  useEffect(() => {
    // Set up page title and meta description
    document.title = "About House of Legends | Premium Hospitality Services";
    
    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content = "Learn about House of Legends, Namibia's premier cocktail experience provider offering signature creations, pre-mixed cocktails, and brand collaborations.";
    document.head.appendChild(metaDesc);
    
    return () => {
      document.head.removeChild(metaDesc);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${cocktailServiceImages[0]})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <img src={brandLogos.houseOfLegends} alt="House of Legends Logo" className="h-16 mb-6" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              About House of <span className="text-secondary">Legends</span>
            </h1>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">Our Story</h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="mb-6">
                  House of Legends was born from a passion for exceptional hospitality and the art of mixology. Founded in Windhoek, Namibia, our journey began with a simple mission: to elevate the cocktail and beverage experience for every client we serve.
                </p>
                
                <p className="mb-6">
                  What started as a small passion project has grown into Namibia's premier cocktail and hospitality collective, bringing together the finest talents in the industry under one roof. Our founder's vision was to create not just memorable drinks, but unforgettable experiences that celebrate the rich culture and flavors of Namibia while incorporating global mixology techniques.
                </p>
                
                <p className="mb-6">
                  Today, House of Legends stands as the umbrella brand for our specialized services, each designed to meet different aspects of the hospitality industry. Through our three distinct brands—House of Legends Events, Legends of Cocktails, and Namibian Bar Masters—we offer a comprehensive approach to beverage excellence, hospitality services, and professional development.
                </p>
                
                <blockquote className="border-l-4 border-secondary pl-4 italic my-8">
                  "Our goal is to transform ordinary moments into legendary experiences through exceptional beverages and service."
                </blockquote>
                
                <p>
                  We take pride in our commitment to quality, creativity, and professionalism. Every cocktail we craft, every event we service, and every professional we train carries the House of Legends signature of excellence. As we continue to grow, we remain dedicated to our founding principles and to raising the standard of hospitality across Namibia.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-primary mb-12 text-center">Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Founder */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <div className="bg-gray-200 w-full h-full"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-primary mb-1">Founder Name</h3>
                  <p className="text-secondary font-medium mb-3">Founder & Head Mixologist</p>
                  <p className="text-neutral text-sm">
                    With over a decade of experience in high-end hospitality, our founder brings unparalleled expertise and passion to every aspect of House of Legends.
                  </p>
                </div>
              </div>
              
              {/* Team Member 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <div className="bg-gray-200 w-full h-full"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-primary mb-1">Team Member</h3>
                  <p className="text-secondary font-medium mb-3">Lead Bartender</p>
                  <p className="text-neutral text-sm">
                    Specializing in creative cocktail development and flavor profiling, our lead bartender brings creativity and technical precision to every drink.
                  </p>
                </div>
              </div>
              
              {/* Team Member 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <div className="bg-gray-200 w-full h-full"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-primary mb-1">Team Member</h3>
                  <p className="text-secondary font-medium mb-3">Events Manager</p>
                  <p className="text-neutral text-sm">
                    With meticulous attention to detail and extensive experience in event planning, our events manager ensures flawless execution every time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Overview */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">Our Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Service 1 */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg border border-white border-opacity-20">
                <h3 className="text-xl font-display font-semibold text-secondary mb-4">Signature Cocktail Experiences</h3>
                <p className="text-white text-sm mb-6">
                  Custom-crafted cocktails and themed menus for private or corporate events, with full setup and professional bartenders.
                </p>
                <a href="/#house-of-legends">
                  <Button variant="outline" className="border-2 border-secondary text-white hover:bg-secondary hover:text-black w-full">
                    Learn More
                  </Button>
                </a>
              </div>
              
              {/* Service 2 */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg border border-white border-opacity-20">
                <h3 className="text-xl font-display font-semibold text-secondary mb-4">Pre-Mixed Cocktails & Batches</h3>
                <p className="text-white text-sm mb-6">
                  Handmade, ready-to-serve bottled cocktails — perfect for lodges, events, and home entertaining.
                </p>
                <a href="/#house-of-legends">
                  <Button variant="outline" className="border-2 border-secondary text-white hover:bg-secondary hover:text-black w-full">
                    Learn More
                  </Button>
                </a>
              </div>
              
              {/* Service 3 */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg border border-white border-opacity-20">
                <h3 className="text-xl font-display font-semibold text-secondary mb-4">Guest Bartender & Brand Collaboration</h3>
                <p className="text-white text-sm mb-6">
                  Elevate your venue or activation with a professional guest shift by our founder or a certified bartender from our network.
                </p>
                <a href="/#house-of-legends">
                  <Button variant="outline" className="border-2 border-secondary text-white hover:bg-secondary hover:text-black w-full">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <a href="/#book-now">
                <Button variant="default" className="bg-secondary hover:bg-secondary/90 text-black px-8 py-6 text-lg">
                  Book Our Services
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}