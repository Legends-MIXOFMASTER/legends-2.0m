import { motion } from 'framer-motion';
import { Link } from 'wouter';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaButtons?: {
    primary?: {
      label: string;
      href: string;
    };
    secondary?: {
      label: string;
      href: string;
    };
  };
  image?: string;
}

export function Hero({ title, subtitle, ctaButtons, image }: HeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-transparent dark:from-primary-900/40" />

      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />

      {/* Content */}
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display">
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300">
              {subtitle}
            </p>
            {ctaButtons && (
              <div className="mt-8 flex gap-4">
                {ctaButtons.primary && (
                  <Link href={ctaButtons.primary.href}>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass-button inline-flex items-center space-x-2 text-lg"
                    >
                      <span>{ctaButtons.primary.label}</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </motion.a>
                  </Link>
                )}
                {ctaButtons.secondary && (
                  <Link href={ctaButtons.secondary.href}>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass-button-secondary inline-flex items-center space-x-2 text-lg"
                    >
                      <span>{ctaButtons.secondary.label}</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.a>
                  </Link>
                )}
              </div>
            )}
          </motion.div>

          {/* Image */}
          {image && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
                <img
                  src={image}
                  alt="Hero"
                  className="object-cover"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
