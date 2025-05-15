import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/utils/animations';

interface TeamMemberProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role: string;
  image: string;
  bio?: string;
  socialLinks?: {
    platform: string;
    url: string;
    icon: React.ReactNode;
  }[];
  className?: string;
}

export function TeamMember({
  name,
  role,
  image,
  bio,
  socialLinks,
  className,
  ...props
}: TeamMemberProps) {
  const memberRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const initAnimations = async () => {
      if (animations.initGSAP) {
        await animations.initGSAP();
      }
      
      if (memberRef.current) {
        animations.scrollReveal(memberRef.current);
      }
    };
    
    initAnimations();
  }, []);

  return (
    <div
      ref={memberRef}
      className={cn(
        'flex flex-col items-center text-center',
        className
      )}
      {...props}
    >
      {/* Member Image */}
      <div className="relative mb-4 group">
        <div className="w-40 h-40 rounded-full overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        </div>
        
        {/* Social icons overlay */}
        {socialLinks && socialLinks.length > 0 && (
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-accent transition-colors duration-300"
                  aria-label={link.platform}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Member details */}
      <h3 className="text-xl font-display font-bold mb-1">{name}</h3>
      <p className="text-accent mb-3">{role}</p>
      
      {bio && (
        <p className="text-neutral-600 text-sm max-w-xs mx-auto">
          {bio}
        </p>
      )}
    </div>
  );
}

export function TeamGrid({
  children,
  className,
  columns = 4,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  columns?: 3 | 4 | 5;
}) {
  const columnsClass = {
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  }[columns];

  return (
    <div 
      className={cn(
        'grid gap-8 md:gap-10',
        columnsClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
