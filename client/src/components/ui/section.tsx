import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/utils/animations';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  fullHeight?: boolean;
  centered?: boolean;
  animate?: 'fade' | 'slide' | 'stagger' | 'none';
  background?: 'light' | 'dark' | 'primary' | 'secondary' | 'accent' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function Section({
  children,
  fullHeight = false,
  centered = true,
  animate = 'fade',
  background = 'none',
  padding = 'md',
  className,
  ...props
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (animate === 'none' || !sectionRef.current) return;
    
    // Initialize GSAP animations
    const initAnimations = async () => {
      // Wait for animations to be initialized
      await animations.initGSAP?.();
      
      switch (animate) {
        case 'fade':
          animations.scrollReveal(sectionRef.current);
          break;
        case 'slide':
          animations.scrollReveal(sectionRef.current);
          break;
        case 'stagger':
          // Find all direct children to stagger
          const children = sectionRef.current.querySelectorAll(':scope > *');
          animations.stagger(children);
          break;
      }
    };
    
    initAnimations();
  }, [animate]);
  
  // Get background color class
  const bgClass = {
    light: 'bg-light',
    dark: 'bg-dark text-white',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    none: '',
  }[background];
  
  // Get padding class
  const paddingClass = {
    none: '',
    sm: 'py-8 px-4 md:py-12 md:px-6',
    md: 'py-12 px-6 md:py-16 md:px-8',
    lg: 'py-16 px-8 md:py-24 md:px-section-x',
  }[padding];
  
  return (
    <section
      ref={sectionRef}
      className={cn(
        bgClass,
        paddingClass,
        fullHeight && 'min-h-screen',
        centered && 'flex flex-col justify-center',
        className
      )}
      {...props}
    >
      <div className="container mx-auto max-w-7xl">
        {children}
      </div>
    </section>
  );
}

// Header component to be used inside sections
export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className,
  ...props
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div 
      className={cn(
        'mb-12',
        centered && 'text-center',
        className
      )}
      {...props}
    >
      <h2 className="text-heading font-display font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-body max-w-3xl mx-auto text-neutral-700 dark:text-neutral-300">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Grid layout component for sections
export function SectionGrid({
  children,
  columns = 3,
  gap = 'md',
  className,
  ...props
}: {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns];
  
  const gapClass = {
    sm: 'gap-4',
    md: 'gap-6 md:gap-8',
    lg: 'gap-8 md:gap-12',
  }[gap];
  
  return (
    <div
      className={cn(
        'grid',
        colsClass,
        gapClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Text-focused section component
export function TextSection({
  heading,
  content,
  align = 'center',
  maxWidth = 'md',
  className,
  ...props
}: {
  heading: string;
  content: string | React.ReactNode;
  align?: 'left' | 'center' | 'right';
  maxWidth?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }[align];
  
  const widthClass = {
    sm: 'max-w-2xl',
    md: 'max-w-3xl',
    lg: 'max-w-4xl',
    full: 'w-full',
  }[maxWidth];
  
  return (
    <div
      className={cn(
        alignClass,
        widthClass,
        className
      )}
      {...props}
    >
      <h2 className="text-heading font-display font-bold mb-6">{heading}</h2>
      {typeof content === 'string' ? (
        <p className="text-body leading-relaxed">{content}</p>
      ) : (
        content
      )}
    </div>
  );
}
