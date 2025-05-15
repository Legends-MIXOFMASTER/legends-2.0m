import React from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

interface FooterProps {
  logo?: string | React.ReactNode;
  tagline?: string;
  navigation?: {
    title: string;
    items: {
      label: string;
      href: string;
    }[];
  }[];
  socialLinks?: {
    platform: string;
    url: string;
    icon: React.ReactNode;
  }[];
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  copyrightText?: string;
  className?: string;
}

export function Footer({
  logo,
  tagline,
  navigation,
  socialLinks,
  contactInfo,
  copyrightText = `© ${new Date().getFullYear()} Legends of Cocktails. All rights reserved.`,
  className,
}: FooterProps) {
  return (
    <footer className={cn(
      'bg-dark text-white py-16 px-6 md:px-8',
      className
    )}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Logo and Tagline */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              {typeof logo === 'string' ? (
                <Link href="/">
                  <a className="inline-block">
                    <img src={logo} alt="Logo" className="h-12 w-auto" />
                  </a>
                </Link>
              ) : logo ? (
                <Link href="/">
                  <a className="inline-block">
                    {logo}
                  </a>
                </Link>
              ) : (
                <Link href="/">
                  <a className="inline-block text-2xl font-display font-bold text-accent">
                    Legends of Cocktails
                  </a>
                </Link>
              )}
            </div>
            
            {tagline && (
              <p className="text-gray-300 mb-8">{tagline}</p>
            )}
            
            {/* Social Links */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex space-x-4 mb-8">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-accent transition-colors duration-300"
                    aria-label={link.platform}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
          
          {/* Navigation Links */}
          {navigation && navigation.length > 0 && (
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {navigation.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h4 className="text-lg font-semibold mb-4">{group.title}</h4>
                  <ul className="space-y-3">
                    {group.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link href={item.href}>
                          <a className="text-gray-300 hover:text-accent transition-colors duration-300">
                            {item.label}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          
          {/* Contact Information */}
          {contactInfo && (
            <div className="lg:col-span-3">
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-gray-300">
                {contactInfo.email && (
                  <li className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2 text-accent" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a 
                      href={`mailto:${contactInfo.email}`} 
                      className="hover:text-accent transition-colors duration-300"
                    >
                      {contactInfo.email}
                    </a>
                  </li>
                )}
                
                {contactInfo.phone && (
                  <li className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2 text-accent" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a 
                      href={`tel:${contactInfo.phone}`} 
                      className="hover:text-accent transition-colors duration-300"
                    >
                      {contactInfo.phone}
                    </a>
                  </li>
                )}
                
                {contactInfo.address && (
                  <li className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2 text-accent" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{contactInfo.address}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{copyrightText}</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link href="/privacy-policy">
                    <a className="text-gray-400 hover:text-accent text-sm transition-colors duration-300">
                      Privacy Policy
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/terms">
                    <a className="text-gray-400 hover:text-accent text-sm transition-colors duration-300">
                      Terms of Service
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
