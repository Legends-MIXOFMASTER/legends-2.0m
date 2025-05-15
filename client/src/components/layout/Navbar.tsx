import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about/legends-of-cocktails' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center cursor-pointer"
              >
                <span className="font-display text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  Legends of Cocktails
                </span>
              </motion.a>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <motion.a
                    whileHover={{ y: -2 }}
                    className={\`px-3 py-2 rounded-md text-sm font-medium \${
                      location === item.href
                        ? 'text-white bg-primary-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-primary-500/10'
                    }\`}
                  >
                    {item.name}
                  </motion.a>
                </Link>
              ))}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-300">
                    Welcome, {user?.username}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => logout()}
                    className="glass-button text-sm"
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <Link href="/login">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-button text-sm"
                  >
                    Login
                  </motion.a>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="glass-button p-2"
              >
                <span className="sr-only">Open main menu</span>
                <div className="w-5 h-5 flex flex-col justify-between">
                  <span
                    className={\`h-0.5 w-full bg-current transform transition-all duration-300 \${
                      isOpen ? 'rotate-45 translate-y-2' : ''
                    }\`}
                  />
                  <span
                    className={\`h-0.5 w-full bg-current transition-all duration-300 \${
                      isOpen ? 'opacity-0' : ''
                    }\`}
                  />
                  <span
                    className={\`h-0.5 w-full bg-current transform transition-all duration-300 \${
                      isOpen ? '-rotate-45 -translate-y-2' : ''
                    }\`}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <motion.a
                      whileHover={{ x: 4 }}
                      className={\`block px-3 py-2 rounded-md text-base font-medium \${
                        location === item.href
                          ? 'text-white bg-primary-500/20'
                          : 'text-gray-300 hover:text-white hover:bg-primary-500/10'
                      }\`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </motion.a>
                  </Link>
                ))}
                {isAuthenticated ? (
                  <div className="pt-4 pb-3 border-t border-white/10">
                    <div className="px-3">
                      <div className="text-base text-gray-300">
                        {user?.username}
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="mt-3 glass-button w-full text-left"
                      >
                        Logout
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login">
                    <motion.a
                      whileTap={{ scale: 0.95 }}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-primary-500/10"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </motion.a>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
