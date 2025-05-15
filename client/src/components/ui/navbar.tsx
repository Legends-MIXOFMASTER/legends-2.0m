import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'wouter';
import { animations } from '@/utils/animations';

interface NavItem {
  label: string;
  href: string;
  children?: Omit<NavItem, 'children'>[];
}

interface NavbarProps {
  logo: string | React.ReactNode;
  items: NavItem[];
  ctaButton?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  transparent?: boolean;
  sticky?: boolean;
  className?: string;
}

export function Navbar({
  logo,
  items,
  ctaButton,
  transparent = false,
  sticky = true,
  className,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll effect for transparent navbar
  useEffect(() => {
    if (!transparent) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transparent]);
  
  // Initialize animations
  useEffect(() => {
    const initAnimations = async () => {
      await animations.initGSAP?.();
      
      if (navbarRef.current) {
        animations.fadeIn(navbarRef.current, 0.2, 0.5);
      }
    };
    
    initAnimations();
  }, []);
  
  return (
    <div 
      ref={navbarRef}
      className={cn(
        'w-full py-4 px-6 md:px-8 z-50 transition-all duration-300',
        sticky && 'sticky top-0',
        transparent && !isScrolled
          ? 'bg-transparent text-white'
          : 'bg-white text-dark shadow-md',
        transparent && isScrolled && 'backdrop-blur-md bg-white/80',
        className
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            {typeof logo === 'string' ? (
              <Link href="/">
                <a className="block">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-10 md:h-12 w-auto"
                  />
                </a>
              </Link>
            ) : (
              <Link href="/">
                <a className="block">
                  {logo}
                </a>
              </Link>
            )}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.children ? (
                  <DropdownMenu item={item} />
                ) : (
                  <Link href={item.href}>
                    <a className={cn(
                      'px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200',
                      transparent && !isScrolled
                        ? 'hover:bg-white/10'
                        : 'hover:bg-gray-100'
                    )}>
                      {item.label}
                    </a>
                  </Link>
                )}
              </React.Fragment>
            ))}
            
            {/* CTA Button */}
            {ctaButton && (
              <Link href={ctaButton.href}>
                <a
                  className="ml-4 px-5 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition-colors duration-200"
                  onClick={ctaButton.onClick}
                >
                  {ctaButton.label}
                </a>
              </Link>
            )}
          </nav>
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              className="p-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(isMobileMenuOpen && 'hidden')}
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(!isMobileMenuOpen && 'hidden')}
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden absolute left-0 right-0 h-screen bg-white dark:bg-gray-900 px-6 py-8 transition-transform duration-300 ease-in-out transform',
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full',
          'top-full z-40'
        )}
      >
        <nav className="flex flex-col space-y-4">
          {items.map((item, index) => (
            <div key={index}>
              {item.children ? (
                <MobileSubmenu item={item} />
              ) : (
                <Link href={item.href}>
                  <a
                    className="block py-3 px-4 text-lg font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              )}
            </div>
          ))}
          
          {/* Mobile CTA Button */}
          {ctaButton && (
            <Link href={ctaButton.href}>
              <a
                className="mt-4 w-full px-5 py-3 rounded-lg bg-accent text-white text-center font-medium hover:bg-accent-hover transition-colors duration-200"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  ctaButton.onClick?.();
                }}
              >
                {ctaButton.label}
              </a>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}

// Desktop Dropdown Menu Component
function DropdownMenu({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="px-4 py-2 rounded-lg text-base font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            'ml-1 transition-transform duration-200',
            isOpen ? 'transform rotate-180' : ''
          )}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      <div 
        className={cn(
          'absolute left-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-in-out z-50',
          isOpen ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95 pointer-events-none'
        )}
      >
        {item.children?.map((child, index) => (
          <Link key={index} href={child.href}>
            <a 
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {child.label}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Mobile Submenu Component
function MobileSubmenu({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button
        className="w-full flex justify-between items-center py-3 px-4 text-lg font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            'transition-transform duration-200',
            isOpen ? 'transform rotate-180' : ''
          )}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      <div className={cn(
        'overflow-hidden transition-all duration-300 ease-in-out',
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="pl-4 py-2 border-l-2 border-gray-200 dark:border-gray-700 ml-4 mt-2">
          {item.children?.map((child, index) => (
            <Link key={index} href={child.href}>
              <a className="block py-2 px-4 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                {child.label}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
