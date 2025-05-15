import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/utils/animations';

interface CallToActionProps extends React.HTMLAttributes<HTMLDivElement> {
  // Component can be used with either title/actions pattern or simple label/href pattern
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  
  // Alternative simplified usage
  label?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  
  // Shared props
  backgroundStyle?: 'light' | 'dark' | 'primary' | 'accent' | 'gradient';
  layout?: 'centered' | 'split';
  className?: string;
}

export function CallToAction({
  // Combined props to support both usage patterns
  title,
  description,
  primaryAction,
  secondaryAction,
  label,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  backgroundStyle = 'primary',
  layout = 'centered',
  className,
  ...props
}: CallToActionProps) {
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const initAnimations = async () => {
      await animations.initGSAP?.();
      
      if (ctaRef.current) {
        animations.scrollReveal(ctaRef.current);
      }
    };
    
    initAnimations();
  }, []);
  
  // Background styles
  const backgroundClass = {
    'light': 'bg-light text-dark',
    'dark': 'bg-dark text-white',
    'primary': 'bg-primary text-white',
    'accent': 'bg-accent text-dark',
    'gradient': 'bg-gradient-to-r from-primary to-accent text-white',
  }[backgroundStyle];
  
  // Layout styles
  const layoutClass = {
    'centered': 'text-center',
    'split': 'md:flex md:justify-between md:items-center',
  }[layout];
  
  // If using the simplified pattern (for standalone buttons)  
  if (label && href) {
    const buttonSizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg',
    }[size];
    
    const buttonVariantClasses = {
      primary: 'bg-primary text-white hover:bg-primary-hover',
      secondary: 'bg-neutral-100 text-primary hover:bg-neutral-200',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      accent: 'bg-accent text-white hover:bg-accent-hover',
    }[variant];
    
    // Only pass anchor-specific props to the anchor element
    const { children, ...anchorProps } = props as React.HTMLAttributes<HTMLAnchorElement>;
    
    return (
      <a
        href={href}
        onClick={onClick}
        className={cn(
          'inline-block rounded-lg text-center transition-all duration-300',
          buttonSizeClasses,
          buttonVariantClasses,
          className
        )}
      >
        {label}
      </a>
    );
  }
  
  // Traditional CTA section with title and buttons
  return (
    <div
      ref={ctaRef}
      className={cn(
        'py-16 px-8 md:py-24 md:px-12 rounded-2xl',
        backgroundClass,
        layoutClass,
        className
      )}
      {...props}
    >
      <div className={cn(
        'mb-8',
        layout === 'split' ? 'md:mb-0 md:max-w-lg' : 'mx-auto max-w-2xl'
      )}>
        {title && <h2 className="text-subheading font-display font-bold mb-4">{title}</h2>}
        {description && (
          <p className={cn(
            'text-body',
            backgroundStyle === 'light' ? 'text-neutral-600' : 'text-opacity-90'
          )}>
            {description}
          </p>
        )}
      </div>
      
      <div className={cn(
        'flex flex-col sm:flex-row gap-4',
        layout === 'centered' ? 'justify-center' : 'md:justify-end'
      )}>
        {primaryAction && (
          <a
            href={primaryAction.href}
            onClick={primaryAction.onClick}
            className={cn(
              'px-8 py-3 rounded-lg text-center transition-all duration-300',
              backgroundStyle === 'light' || backgroundStyle === 'accent'
                ? 'bg-primary text-white hover:bg-primary-hover'
                : 'bg-white text-primary hover:bg-opacity-90'
            )}
          >
            {primaryAction.label}
          </a>
        )}
        
        {secondaryAction && (
          <a
            href={secondaryAction.href}
            onClick={secondaryAction.onClick}
            className={cn(
              'px-8 py-3 rounded-lg text-center transition-all duration-300',
              backgroundStyle === 'light' || backgroundStyle === 'accent'
                ? 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                : 'border-2 border-white text-white hover:bg-white hover:text-primary'
            )}
          >
            {secondaryAction.label}
          </a>
        )}
      </div>
    </div>
  );
}
