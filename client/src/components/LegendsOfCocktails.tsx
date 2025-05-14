import { mobileBarImages, brandLogos } from "@/lib/assets";
import { Button } from "@/components/ui/button";

export default function LegendsOfCocktails() {
  const services = [
    {
      title: "Mobile Bar Setup & Staffing",
      description: "Complete bar service setup for events, with equipment, glassware, and skilled bar staff.",
      image: mobileBarImages[0],
      action: "Book Now"
    },
    {
      title: "Beverage & Menu Consulting",
      description: "Tailored consulting for properties looking to upgrade their drink service or menus.",
      image: mobileBarImages[2],
      action: "Inquire"
    },
    {
      title: "Onsite Staff Training",
      description: "Training front-of-house teams in mixology, drink service, and guest interaction.",
      image: mobileBarImages[1],
      action: "Schedule"
    },
    {
      title: "Equipment Supply & Setup",
      description: "Design, source, and set up professional bar stations for hospitality properties.",
      image: mobileBarImages[3],
      action: "Get Quote"
    }
  ];

  return (
    <section id="legends-of-cocktails" className="py-20 bg-gray-50" data-brand="legends-of-cocktails">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <img src={brandLogos.legendsOfCocktails} alt="Legends of Cocktails Logo" className="h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-4">Hospitality Services</h2>
          <p className="text-neutral text-lg max-w-3xl mx-auto">
            Complete hospitality solutions including mobile bar services, consulting, and professional equipment rentals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-shadow">
              <div className="relative">
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-accent bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a href="#book-now">
                    <Button variant="default" className="bg-white text-accent hover:bg-opacity-90">
                      {service.action}
                    </Button>
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-accent mb-2">{service.title}</h3>
                <p className="text-neutral text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
          <a href="#hire-equipment">
            <Button 
              variant="default" 
              className="bg-accent hover:bg-opacity-90 text-white py-6 px-8 rounded-md"
            >
              Hire Equipment
            </Button>
          </a>
          <a href="#freelance-register">
            <Button 
              variant="outline" 
              className="border-2 border-accent text-accent py-6 px-8 rounded-md hover:bg-accent hover:text-white"
            >
              Register as Freelancer
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
