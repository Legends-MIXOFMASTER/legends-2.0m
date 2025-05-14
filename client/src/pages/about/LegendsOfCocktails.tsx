import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { mobileBarImages, brandLogos } from "@/lib/assets";

export default function LegendsOfCocktailsAbout() {
  useEffect(() => {
    // Set up page title and meta description
    document.title = "About Legends of Cocktails | Premium Hospitality Services";
    
    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content = "Learn about Legends of Cocktails, providing professional mobile bar services, hospitality consulting, and equipment rental throughout Namibia.";
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
        <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${mobileBarImages[0]})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <img src={brandLogos.legendsOfCocktails} alt="Legends of Cocktails Logo" className="h-16 mb-6" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              About Legends of <span className="text-secondary">Cocktails</span>
            </h1>
          </div>
        </section>
        
        {/* Our Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">Our Mission</h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="mb-6">
                  Legends of Cocktails was established to bring professional hospitality services and solutions to venues, events, and businesses throughout Namibia. We recognized that many establishments and event planners needed access to high-quality bar services and equipment without the substantial investment of building permanent infrastructure.
                </p>
                
                <p className="mb-6">
                  Our mission is to provide comprehensive hospitality solutions that elevate the guest experience while making professional bar service accessible to all types of events and venues. Whether it's a wedding celebration, corporate function, or lodge opening, Legends of Cocktails delivers the expertise, equipment, and staff needed to create memorable beverage experiences.
                </p>
                
                <p className="mb-6">
                  Beyond event services, we're passionate about sharing our knowledge with hospitality professionals through our consulting services. We believe that raising the standard of bar service throughout Namibia benefits the entire industry and creates better experiences for both locals and tourists visiting our beautiful country.
                </p>
                
                <blockquote className="border-l-4 border-secondary pl-4 italic my-8">
                  "We don't just serve drinks; we create experiences that reflect the vibrant spirit of Namibian hospitality."
                </blockquote>
                
                <p>
                  Our team comprises experienced professionals who understand the unique challenges and opportunities in the Namibian hospitality industry. With backgrounds in hotel management, event planning, and mixology, we bring a well-rounded perspective to every project and a commitment to excellence that defines everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* What We Offer Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-primary mb-12 text-center">What We Offer</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto">
              {/* Service 1 */}
              <div className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-primary mb-2">Mobile Bar Setup & Staffing</h3>
                  <p className="text-neutral">
                    Complete bar service setup for events, with equipment, glassware, and skilled bar staff. Ideal for venues with no fixed bar or for adding specialty stations to existing setups.
                  </p>
                </div>
              </div>
              
              {/* Service 2 */}
              <div className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-primary mb-2">Beverage & Menu Consulting</h3>
                  <p className="text-neutral">
                    Tailored consulting for hotels, lodges, and restaurants looking to upgrade their drink service, staff knowledge, or cocktail menus. We analyze your market, clientele, and venue to create customized solutions.
                  </p>
                </div>
              </div>
              
              {/* Service 3 */}
              <div className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-primary mb-2">Onsite Staff Training</h3>
                  <p className="text-neutral">
                    Bring hospitality excellence to your property — we train front-of-house teams in mixology, drink service, and guest interaction. Our on-site programs are tailored to your venue's specific needs and service style.
                  </p>
                </div>
              </div>
              
              {/* Service 4 */}
              <div className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-primary mb-2">Equipment Supply & Bar Setup Support</h3>
                  <p className="text-neutral">
                    We help design, source, and set up professional bar stations for new or existing hospitality properties. From equipment recommendations to full turnkey installations, we have solutions for every budget and venue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Freelancer Network Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-6">Join Our Freelancer Network</h2>
              <p className="text-gray-300 text-lg mb-8">
                Are you a bartender, server, or hospitality professional looking for flexible work opportunities? Join our network of freelance professionals and gain access to events, training, and career development opportunities.
              </p>
              <a href="/#freelance-register">
                <Button variant="default" className="bg-secondary hover:bg-secondary/90 text-black px-8 py-6 text-lg">
                  Register as Freelancer
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