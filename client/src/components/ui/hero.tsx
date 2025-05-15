import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/utils/animations';

// Use Omit to avoid conflicts with title property in HTMLAttributes
// Define CTA action type for better type checking
interface CTAAction {
  label: string;
  href: string;
  onClick?: () => void;
}

// Define Hero CTA options as two separate properties for better type safety
interface HeroCTAOptions {
  primary?: CTAAction;
  secondary?: CTAAction;
}

interface HeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundOverlay?: boolean;
  contentAlignment?: 'left' | 'center' | 'right';
  textColor?: 'light' | 'dark';
  fullHeight?: boolean;
  scrollCue?: boolean;
  // Separate props for different CTA types to avoid type conflicts
  cta?: React.ReactNode;
  ctaButtons?: HeroCTAOptions;
  className?: string;
}

export function Hero({
  title,
  subtitle,
  backgroundImage,
  backgroundVideo,
  backgroundOverlay = true,
  contentAlignment = 'center',
  textColor = 'light',
  fullHeight = true,
  scrollCue = true,
  cta,
  ctaButtons,
  className,
  ...props
}: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const initAnimations = async () => {
      // Wait for animations to be initialized
      await animations.initGSAP?.();
      
      if (titleRef.current) {
        animations.fadeIn(titleRef.current, 0.3, 1);
        animations.slideUp(titleRef.current, 0.3, 1);
      }
      
      if (subtitleRef.current) {
        animations.fadeIn(subtitleRef.current, 0.8, 1);
        animations.slideUp(subtitleRef.current, 0.8, 1);
      }
      
      if (ctaRef.current) {
        animations.fadeIn(ctaRef.current, 1.2, 1);
      }
      
      if (scrollCueRef.current) {
        animations.fadeIn(scrollCueRef.current, 1.5, 1);
        
        // Add a subtle bounce animation
        const bounce = async () => {
          const { gsap } = await animations.initGSAP?.() || {};
          if (gsap && scrollCueRef.current) {
            gsap.to(scrollCueRef.current, {
              y: 10,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        };
        
        bounce();
      }
    };
    
    initAnimations();
  }, []);
  
  // Determine alignment classes
  const alignmentClass = {
    'left': 'items-start text-left',
    'center': 'items-center text-center',
    'right': 'items-end text-right',
  }[contentAlignment];
  
  // Determine text color classes
  const textColorClass = {
    'light': 'text-white',
    'dark': 'text-dark',
  }[textColor];
  
  return (
    <div
      ref={heroRef}
      className={cn(
        'relative overflow-hidden',
        fullHeight && 'min-h-screen',
        className
      )}
      {...props}
    >
      {/* Background image */}
      {backgroundImage && (
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={backgroundImage} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          {backgroundOverlay && (
            <div className="absolute inset-0 bg-black/40" />
          )}
        </div>
      )}
      
      {/* Background video */}
      {backgroundVideo && (
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          {backgroundOverlay && (
            <div className="absolute inset-0 bg-black/40" />
          )}
        </div>
      )}
      
      {/* Content container */}
      <div className={cn(
        'relative z-10 px-6 md:px-12 py-16 md:py-24 flex flex-col justify-center',
        fullHeight && 'min-h-screen',
        alignmentClass
      )}>
        <div className="container mx-auto max-w-6xl">
          {/* Title */}
          <div 
            ref={titleRef}
            className="mb-6"
          >
            {typeof title === 'string' ? (
              <h1 className={cn(
                'text-hero font-display font-bold leading-tight',
                textColorClass
              )}>
                {title}
              </h1>
            ) : (
              title
            )}
          </div>
          
          {/* Subtitle */}
          {subtitle && (
            <div
              ref={subtitleRef}
              className="mb-8 max-w-2xl mx-auto"
            >
              {typeof subtitle === 'string' ? (
                <p className={cn(
                  'text-body md:text-xl',
                  textColorClass,
                  textColor === 'light' ? 'text-opacity-90' : 'text-opacity-80'
                )}>
                  {subtitle}
                </p>
              ) : (
                subtitle
              )}
            </div>
          )}
          
          {/* Call to action */}
          {(cta || ctaButtons) && (
            <div
              ref={ctaRef}
              className="mt-8"
            >
              {/* If custom buttons are provided */}
              {ctaButtons ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {ctaButtons.primary && (
                    <a
                      href={ctaButtons.primary.href}
                      onClick={ctaButtons.primary.onClick}
                      className="px-8 py-3 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all duration-300 text-center"
                    >
                      {ctaButtons.primary.label}
                    </a>
                  )}
                  
                  {ctaButtons.secondary && (
                    <a
                      href={ctaButtons.secondary.href}
                      onClick={ctaButtons.secondary.onClick}
                      className="px-8 py-3 rounded-lg border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 text-center"
                    >
                      {ctaButtons.secondary.label}
                    </a>
                  )}
                </div>
              ) : (
                // Otherwise use the React node
                cta
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll cue */}
      {scrollCue && (
        <div 
          ref={scrollCueRef}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className={cn(
            'flex flex-col items-center',
            textColorClass
          )}>
            <span className="text-sm uppercase tracking-widest mb-2">Scroll</span>
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
              className="animate-pulse"
            >
              <polyline points="7 13 12 18 17 13"></polyline>
              <polyline points="7 6 12 11 17 6"></polyline>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
