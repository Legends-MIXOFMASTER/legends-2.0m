import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';
import { animations } from '@/utils/animations';

// Import UI components
import { Navbar } from '@/components/ui/navbar';
import { Section, SectionHeader } from '@/components/ui/section';
import { Footer } from '@/components/ui/footer';
import { CallToAction } from '@/components/ui/cta';

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const [location, setLocation] = useLocation();
  
  // Navigation items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Book", href: "/#booking" },
    { label: "Account", href: "/account", highlight: true },
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

  useEffect(() => {
    // Initialize animations
    const initAnimations = async () => {
      if (animations.initGSAP) {
        await animations.initGSAP();
      }
      await animations.initSmoothScroll();
    };

    initAnimations();
    
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      setLocation('/login');
      return;
    }
  }, [isAuthenticated, setLocation]);

  // Handle logout
  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar logo="/images/logo.png" items={navItems} />
      
      <Section className="bg-light py-16">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader 
            title={`Welcome, ${user?.fullName || 'User'}`}
            subtitle="Manage your account and bookings"
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar Navigation */}
            <div className="bg-white rounded-xl p-6 shadow-card h-fit">
              <h3 className="text-xl font-display font-bold mb-6">Account</h3>
              
              <nav className="space-y-1">
                <a 
                  href="#dashboard" 
                  className="block py-2 px-4 rounded-lg bg-accent/10 text-accent font-medium"
                >
                  Dashboard
                </a>
                <a 
                  href="#bookings" 
                  className="block py-2 px-4 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  My Bookings
                </a>
                <a 
                  href="#profile" 
                  className="block py-2 px-4 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  Profile
                </a>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left py-2 px-4 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              </nav>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-2">
              <div id="dashboard" className="bg-white rounded-xl p-8 shadow-card mb-8">
                <h3 className="text-xl font-display font-bold mb-6">Account Overview</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-neutral-500 font-medium mb-2">
                      Personal Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-neutral-500">Full Name</p>
                        <p className="font-medium">{user?.fullName || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Email</p>
                        <p className="font-medium">{user?.email || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Phone</p>
                        <p className="font-medium">{user?.phone || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-light rounded-lg p-5">
                    <h4 className="text-sm uppercase tracking-wider text-neutral-500 font-medium mb-4">
                      Quick Actions
                    </h4>
                    <div className="space-y-3">
                      <a 
                        href="/#booking" 
                        className="flex items-center py-2 px-4 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Book a Service
                      </a>
                      <a 
                        href="#bookings" 
                        className="flex items-center py-2 px-4 rounded-lg hover:bg-accent/5 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                        View Bookings
                      </a>
                      <a 
                        href="#profile" 
                        className="flex items-center py-2 px-4 rounded-lg hover:bg-accent/5 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Edit Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div id="bookings" className="bg-white rounded-xl p-8 shadow-card mb-8">
                <h3 className="text-xl font-display font-bold mb-6">My Bookings</h3>
                
                <div className="border rounded-lg divide-y">
                  {/* Example booking entries - in real implementation, this would be fetched from an API */}
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h4 className="font-medium">Mobile Bar Service</h4>
                        <p className="text-sm text-neutral-500">Corporate Event | June 15, 2025</p>
                        <p className="text-sm mt-1">Windhoek Business Center</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          Confirmed
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h4 className="font-medium">Mixology Workshop</h4>
                        <p className="text-sm text-neutral-500">Private Event | July 23, 2025</p>
                        <p className="text-sm mt-1">House of Legends Studio</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <CallToAction
                    label="Book Another Service"
                    href="/#booking"
                    variant="primary"
                    size="md"
                  />
                </div>
              </div>
              
              <div id="profile" className="bg-white rounded-xl p-8 shadow-card">
                <h3 className="text-xl font-display font-bold mb-6">Edit Profile</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                        defaultValue={user?.fullName || ''}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full p-2 border rounded-lg bg-neutral-50"
                        defaultValue={user?.email || ''}
                        disabled
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                        defaultValue={user?.phone || ''}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-1">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        id="company"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                        defaultValue={''}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="preferences" className="block text-sm font-medium text-neutral-700 mb-1">
                      Preferences
                    </label>
                    <textarea
                      id="preferences"
                      rows={4}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-accent focus:outline-none"
                      placeholder="Tell us about your preferences, dietary restrictions, or favorite drinks"
                      defaultValue={''}
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
