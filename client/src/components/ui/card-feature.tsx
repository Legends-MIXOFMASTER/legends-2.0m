import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/utils/animations';

interface CardFeatureProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  hoverEffect?: boolean;
  className?: string;
}

export function CardFeature({
  title,
  description,
  icon,
  image,
  hoverEffect = true,
  className,
  ...props
}: CardFeatureProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!hoverEffect || !cardRef.current) return;
    
    // Initialize hover animations
    const initAnimations = async () => {
      await animations.initGSAP?.();
      
      if (cardRef.current) {
        animations.hoverEffect(cardRef.current, 1.03);
      }
    };
    
    initAnimations();
  }, [hoverEffect]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'bg-white rounded-lg p-6 shadow-card transition-all duration-300',
        'flex flex-col h-full',
        hoverEffect && 'hover:shadow-elevated',
        className
      )}
      {...props}
    >
      {/* Card header with icon or image */}
      <div className="mb-4">
        {icon && (
          <div className="text-accent text-3xl mb-4">
            {icon}
          </div>
        )}
        {image && (
          <div className="mb-4 overflow-hidden rounded-md">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" 
            />
          </div>
        )}
      </div>
      
      {/* Card content */}
      <div className="flex-1">
        <h3 className="text-title font-semibold mb-2">{title}</h3>
        <p className="text-neutral-600">{description}</p>
      </div>
    </div>
  );
}

interface FeatureGridProps extends React.HTMLAttributes<HTMLDivElement> {
  features: {
    title: string;
    description: string;
    icon?: React.ReactNode;
    image?: string;
  }[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function FeatureGrid({
  features,
  columns = 3,
  className,
  ...props
}: FeatureGridProps) {
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
      {features.map((feature, index) => (
        <CardFeature
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          image={feature.image}
        />
      ))}
    </div>
  );
}
