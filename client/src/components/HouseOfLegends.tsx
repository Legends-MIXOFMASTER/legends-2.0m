import { cocktailServiceImages, brandLogos } from "@/lib/assets";
import { Button } from "@/components/ui/button";

export default function HouseOfLegends() {
  const services = [
    {
      title: "Signature Cocktail Experiences",
      description: "Custom-crafted cocktails and themed menus for private or corporate events.",
      details: "Our mixologists create custom cocktail menus for your event, with full setup and professional service.",
      image: cocktailServiceImages[1],
      price: "From $500",
      link: "#details-1"
    },
    {
      title: "Pre-Mixed Cocktails & Batches",
      description: "Handmade, ready-to-serve bottled cocktails for any occasion.",
      details: "Handmade, ready-to-serve bottled cocktails perfect for lodges, events, and home entertaining.",
      image: cocktailServiceImages[2],
      price: "From $300",
      link: "#details-2"
    },
    {
      title: "Guest Bartender & Brand Collaboration",
      description: "Professional bartending talent for your venue or brand activation.",
      details: "Elevate your venue or activation with a professional guest shift by our founder or a certified bartender from our network.",
      image: cocktailServiceImages[3],
      price: "From $450",
      link: "#details-3"
    }
  ];

  return (
    <section id="house-of-legends" className="py-20 bg-light" data-brand="house-of-legends">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <img src={brandLogos.houseOfLegends} alt="House of Legends Logo" className="h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Cocktail & Beverage Services</h2>
          <p className="text-neutral text-lg max-w-3xl mx-auto">
            Elevate your event with our signature cocktail experiences, pre-mixed creations, and professional brand collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="overlay-card rounded-lg overflow-hidden shadow-lg relative group">
              <img src={service.image} alt={service.title} className="w-full h-64 object-cover" />
              <div className="overlay absolute inset-0 bg-primary bg-opacity-80 opacity-0 transition-opacity flex flex-col justify-center items-center p-6 text-center">
                <p className="text-white mb-4">{service.details}</p>
                <a href="#book-now">
                  <Button variant="default" className="bg-secondary text-white hover:bg-opacity-80">
                    Book This Service
                  </Button>
                </a>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-primary mb-2">{service.title}</h3>
                <p className="text-neutral text-sm mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary font-medium">{service.price}</span>
                  <a href={service.link} className="text-secondary text-sm font-medium hover:underline">Learn More</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#book-hol">
            <Button 
              variant="default" 
              className="bg-primary hover:bg-opacity-90 text-white py-6 px-8 rounded-md text-base font-accent font-medium transition-all transform hover:scale-105"
            >
              Book House of Legends Services
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
