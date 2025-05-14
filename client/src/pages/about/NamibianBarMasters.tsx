import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trainingImages, bartendingImages, brandLogos } from "@/lib/assets";

export default function NamibianBarMastersAbout() {
  useEffect(() => {
    // Set up page title and meta description
    document.title = "About Namibian Bar Masters | Professional Bartender Training";
    
    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content = "Discover Namibian Bar Masters, the country's premier bartender training program offering certification, advanced courses, and professional development.";
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
        <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${bartendingImages[2]})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <img src={brandLogos.namibianBarMasters} alt="Namibian Bar Masters Logo" className="h-16 mb-6" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              About Namibian <span className="text-secondary">Bar Masters</span>
            </h1>
          </div>
        </section>
        
        {/* Our Purpose Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">Our Purpose</h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="mb-6">
                  Namibian Bar Masters was founded with a singular vision: to elevate the standard of bartending and beverage service throughout Namibia. We recognized that while tourism and hospitality were growing rapidly in our beautiful country, there was a significant gap in specialized training for bartenders and beverage professionals.
                </p>
                
                <p className="mb-6">
                  Our program was developed by industry veterans who understand both international standards and the unique context of Namibian hospitality. We combine rigorous technical training with real-world applications, ensuring our graduates are prepared not just to make drinks, but to create memorable experiences for guests.
                </p>
                
                <p className="mb-6">
                  Beyond individual career development, we're committed to strengthening Namibia's hospitality sector as a whole. By creating a network of highly trained professionals, we help establish Namibia as a destination known for exceptional service and memorable beverage experiences that showcase our local ingredients and culture.
                </p>
                
                <blockquote className="border-l-4 border-secondary pl-4 italic my-8">
                  "We're not just training bartenders; we're cultivating ambassadors for Namibian hospitality and craftsmanship."
                </blockquote>
                
                <p>
                  Our training programs are constantly evolving to reflect current industry trends, emerging techniques, and changing guest expectations. We maintain connections with global beverage experts while emphasizing the importance of showcasing Namibian flavors, ingredients, and traditions in contemporary cocktail creation.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Education Programs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-primary mb-12 text-center">Education Programs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Program 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <img src={bartendingImages[1]} alt="Bartender Training" className="w-full h-48 object-cover" />
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-display font-semibold text-primary mb-3">6-Week Bartender Training & Certification</h3>
                  <p className="text-neutral text-sm mb-4">
                    Our comprehensive flagship program covers everything from bar basics to advanced mixology. Students receive hands-on training in a real bar environment, learning cocktail preparation, wine and spirit knowledge, customer service, and bar operations.
                  </p>
                  <ul className="text-neutral text-sm mb-6 space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-secondary mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>40+ classic and contemporary cocktail recipes</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-secondary mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Spirit categories and production methods</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-secondary mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Bar management and inventory control</span>
                    </li>
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <a href="/#sign-up">
                    <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-white">
                      Enroll Now
                    </Button>
                  </a>
                </div>
              </div>
              
              {/* Program 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <img src={bartendingImages[0]} alt="Advanced Training" className="w-full h-48 object-cover" />
                <div className="p-6 flex-grow">
                  <div className="inline-block px-3 py-1 bg-accent text-white text-xs rounded-full mb-3">Coming Soon</div>
                  <h3 className="text-xl font-display font-semibold text-primary mb-3">Advanced Pro Level Courses</h3>
                  <p className="text-neutral text-sm mb-4">
                    Take your skills to the next level with our specialized advanced courses. Perfect for working professionals looking to master specific areas of mixology and bar service.
                  </p>
                  <ul className="text-neutral text-sm mb-6 space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-secondary mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Molecular mixology techniques</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-secondary mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Competition preparation and flair bartending</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-secondary mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Menu development and bar consulting</span>
                    </li>
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <a href="/#notify-me">
                    <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white">
                      Get Notified
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Additional Programs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
              {/* Monthly Workshops */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-secondary mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-display font-semibold text-primary mb-2 text-center">Monthly Workshops</h3>
                <p className="text-neutral text-sm text-center mb-4">
                  Single-day workshops focusing on specific skills or topics, from wine appreciation to coffee cocktails.
                </p>
                <a href="/#monthly-classes" className="block text-center">
                  <Button variant="link" className="text-secondary hover:text-secondary/80">
                    View Schedule
                  </Button>
                </a>
              </div>
              
              {/* Lodge & Hotel Training */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-secondary mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-display font-semibold text-primary mb-2 text-center">Lodge & Hotel Training</h3>
                <p className="text-neutral text-sm text-center mb-4">
                  Customized 5-day training programs for hospitality staff, conducted at your property.
                </p>
                <a href="/#lodge-packages" className="block text-center">
                  <Button variant="link" className="text-secondary hover:text-secondary/80">
                    Request Info
                  </Button>
                </a>
              </div>
              
              {/* Online Learning */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-secondary mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-display font-semibold text-primary mb-2 text-center">Online Learning Platform</h3>
                <p className="text-neutral text-sm text-center mb-4">
                  Self-paced digital courses for bartenders who want to learn on their own schedule.
                </p>
                <a href="/#online-courses" className="block text-center">
                  <Button variant="link" className="text-secondary hover:text-secondary/80">
                    Coming Soon
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Join Database CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-6">Join Our Professional Database</h2>
              <p className="text-gray-300 text-lg mb-8">
                Graduates of our programs qualify for inclusion in our professional bartender database. This gives you access to job opportunities at leading hotels, lodges, and events throughout Namibia.
              </p>
              <a href="/#bartender-database">
                <Button variant="default" className="bg-secondary hover:bg-secondary/90 text-black px-8 py-6 text-lg">
                  Learn More
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