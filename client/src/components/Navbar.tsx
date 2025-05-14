
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { brandLogos } from "@/lib/assets";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, User, LogIn, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { user, isAuthenticated, logout } = useAuth();

  // Handle scroll event for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      // Update active section based on scroll position
      const sections = ["house-of-legends", "legends-of-cocktails", "namibian-bar-masters"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          } else if (scrollPosition < 100) {
            setActiveSection("home");
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { name: "House of Legends", href: "#house-of-legends" },
    { name: "Legends of Cocktails", href: "#legends-of-cocktails" },
    { name: "Namibian Bar Masters", href: "#namibian-bar-masters" }
  ];

  const aboutLinks = [
    { name: "About House of Legends", href: "/about/house-of-legends" },
    { name: "About Legends of Cocktails", href: "/about/legends-of-cocktails" },
    { name: "About Namibian Bar Masters", href: "/about/namibian-bar-masters" }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-primary shadow-md transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <nav className="container mx-auto px-4 flex flex-row items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <img src={brandLogos.houseOfLegends} alt="House of Legends Logo" className="h-10" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row items-center space-x-8">
          <div className="flex space-x-6">
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="nav-link flex items-center text-white hover:text-secondary text-sm font-accent font-medium transition-colors">
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-white text-black border border-secondary">
                {services.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <button 
                      onClick={() => scrollToSection(link.href.replace('#', ''))} 
                      className="w-full text-left px-4 py-2 hover:bg-secondary/10 cursor-pointer"
                    >
                      {link.name}
                    </button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* About Us Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="nav-link flex items-center text-white hover:text-secondary text-sm font-accent font-medium transition-colors">
                  About Us <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-white text-black border border-secondary">
                {aboutLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <a href={link.href} className="px-4 py-2 hover:bg-secondary/10 cursor-pointer">
                      {link.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Book Now Link */}
            <a 
              href="#book-now"
              className="nav-link text-white hover:text-secondary text-sm font-accent font-medium transition-colors"
            >
              Book Now
            </a>

            {/* Gallery Link */}
            <a 
              href="/gallery"
              className="nav-link text-white hover:text-secondary text-sm font-accent font-medium transition-colors"
            >
              Gallery
            </a>
          </div>

          <div className="flex space-x-4">
            <a href="#contact">
              <Button variant="default" className="bg-secondary hover:bg-secondary/90 text-black">
                Contact Us
              </Button>
            </a>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-2 border-secondary text-white hover:bg-secondary hover:text-black">
                    <Avatar className="h-5 w-5 mr-2">
                      <AvatarFallback className="bg-secondary text-black text-xs">
                        {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    {user?.fullName || user?.username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white text-black border border-secondary">
                  <div className="p-2 border-b border-gray-200">
                    <p className="font-medium">{user?.fullName || user?.username}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <a href="/profile" className="px-4 py-2 hover:bg-secondary/10 cursor-pointer flex items-center">
                      <Settings className="mr-2 h-4 w-4" /> Profile Settings
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button 
                      onClick={logout} 
                      className="px-4 py-2 hover:bg-secondary/10 cursor-pointer flex items-center w-full text-left"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="border-2 border-secondary text-white hover:bg-secondary hover:text-black">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-primary text-white">
              <div className="flex flex-col space-y-4 mt-10">
                <div className="py-2 border-b border-white/10">
                  <p className="font-semibold mb-1 text-secondary">Services</p>
                  {services.map((link) => (
                    <a 
                      key={link.name}
                      href={link.href}
                      className="block py-2 text-sm hover:text-secondary transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>

                <div className="py-2 border-b border-white/10">
                  <p className="font-semibold mb-1 text-secondary">About Us</p>
                  {aboutLinks.map((link) => (
                    <a 
                      key={link.name}
                      href={link.href}
                      className="block py-2 text-sm hover:text-secondary transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>

                <a href="#book-now" className="py-2 hover:text-secondary">
                  Book Now
                </a>

                <a href="/gallery" className="py-2 hover:text-secondary">
                  Gallery
                </a>

                <a href="#contact" className="mt-4">
                  <Button variant="default" className="w-full bg-secondary hover:bg-secondary/90 text-black">
                    Contact Us
                  </Button>
                </a>

                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-black">
                          {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-secondary">{user?.fullName || user?.username}</p>
                        <p className="text-xs text-white/70">{user?.email}</p>
                      </div>
                    </div>

                    <a href="/profile">
                      <Button variant="outline" className="w-full border-2 border-white/20 text-white hover:bg-white/10">
                        <Settings className="mr-2 h-4 w-4" /> Profile Settings
                      </Button>
                    </a>

                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-secondary text-white hover:bg-secondary hover:text-black"
                      onClick={logout}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button variant="outline" className="w-full border-2 border-secondary text-white hover:bg-secondary hover:text-black">
                      <LogIn className="mr-2 h-4 w-4" /> Login
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
