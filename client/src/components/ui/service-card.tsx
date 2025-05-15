import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/utils/animations';

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  hoverEffect?: boolean;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  image,
  hoverEffect = true,
  actionLabel,
  actionHref,
  className,
  ...props
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const initAnimations = async () => {
      if (animations.initGSAP) {
        await animations.initGSAP();
      }
      
      if (cardRef.current) {
        animations.scrollReveal(cardRef.current);
        
        if (hoverEffect) {
          animations.hoverEffect(cardRef.current, 1.03);
        }
      }
    };
    
    initAnimations();
  }, [hoverEffect]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'bg-white rounded-xl shadow-card transition-all duration-300 overflow-hidden flex flex-col h-full',
        hoverEffect && 'hover:shadow-elevated',
        className
      )}
      {...props}
    >
      {/* Card image */}
      {image && (
        <div className="relative overflow-hidden">
          <div className="w-full aspect-[16/9] overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}
      
      {/* Card content */}
      <div className={cn(
        'flex-1 p-6',
        image ? 'pt-5' : 'pt-6'
      )}>
        {/* Icon */}
        {icon && !image && (
          <div className="mb-4 text-accent text-3xl">
            {icon}
          </div>
        )}
        
        {/* Title */}
        <h3 className="font-display font-bold text-xl text-gray-900 mb-3">{title}</h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-4">{description}</p>
        
        {/* Action Link */}
        {actionLabel && actionHref && (
          <div className="mt-auto pt-4">
            <a 
              href={actionHref}
              className="inline-flex items-center text-accent font-medium hover:underline"
            >
              {actionLabel}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function ServiceGrid({
  children,
  className,
  columns = 3,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  columns?: 2 | 3 | 4;
}) {
  const columnsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div 
      className={cn(
        'grid gap-6 md:gap-8',
        columnsClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
