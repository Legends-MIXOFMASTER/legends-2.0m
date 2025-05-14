import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { brandLogos } from "@/lib/assets";
import { apiRequest } from "@/lib/queryClient";
import { 
  Instagram, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Layers, 
  Send 
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await apiRequest("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      toast({
        title: "Success!",
        description: "You have been subscribed to our newsletter.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem subscribing you. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const quickLinks = [
    { name: "House of Legends", href: "#house-of-legends" },
    { name: "Legends of Cocktails", href: "#legends-of-cocktails" },
    { name: "Namibian Bar Masters", href: "#namibian-bar-masters" },
    { name: "Book Services", href: "#book-now" },
    { name: "Contact Us", href: "#contact" },
  ];
  
  const services = [
    { name: "Cocktail Experiences", href: "#" },
    { name: "Mobile Bar Setup", href: "#" },
    { name: "Bartender Training", href: "#" },
    { name: "Menu Consulting", href: "#" },
    { name: "Equipment Rental", href: "#" },
  ];

  return (
    <footer className="bg-primary py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-3">
            <img src={brandLogos.houseOfLegends} alt="House of Legends Logo" className="h-12 mb-6" />
            <p className="text-gray-300 text-sm mb-6">
              Namibia's premier hospitality collective, bringing exceptional experiences through our specialized brands.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/legends.of.cocktails.namibia" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/LegendsOfCocktailsNamibia" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-white font-display font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-secondary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="text-white font-display font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a href={service.href} className="text-gray-300 hover:text-secondary transition-colors">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className="md:col-span-3">
            <h4 className="text-white font-display font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary mr-3 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Windhoek, Namibia
                </span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-secondary mr-3 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <p className="mb-1">General: info@legendsofcocktails.com</p>
                  <p className="mb-1">Bookings: bookings@legendsofcocktails.com</p>
                  <p>Training: training@namibianbarmasters.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-secondary mr-3 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  +264 85 758 1864
                </span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-secondary mr-3 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <p className="mb-1">Monday – Friday: 9:00 AM – 6:00 PM</p>
                  <p className="mb-1">Saturday: 10:00 AM – 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-2">
            <h4 className="text-white font-display font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for updates on events and special offers.
            </p>
            <form className="flex" onSubmit={handleSubmit}>
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="rounded-r-none focus:ring-1 focus:ring-secondary bg-white/10 text-white border-white/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="default" 
                className="bg-secondary text-black rounded-l-none hover:bg-opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-gray-300 text-sm">&copy; 2025 Legends of Cocktails. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="/privacy-policy" className="text-gray-300 hover:text-secondary text-sm transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="text-gray-300 hover:text-secondary text-sm transition-colors">Terms of Service</a>
              <a href="/admin" className="text-gray-300 hover:text-secondary text-sm transition-colors">Admin Portal</a>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-400 text-xs">Domain: legendsofcocktails.com | Email: legendsofcocktails@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
