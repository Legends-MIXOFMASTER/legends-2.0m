import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/utils/animations';

interface TestimonialProps {
  quote?: string;
  content?: string; // Alternative to quote for better naming flexibility
  author: string;
  role?: string;
  company?: string;
  image?: string;
  avatar?: string; // Alternative to image
  rating?: number; // Optional rating
}

interface TestimonialsSliderProps {
  testimonials: TestimonialProps[];
  title?: string;
  subtitle?: string;
  background?: 'light' | 'dark' | 'primary' | 'secondary';
  autoplay?: boolean;
  autoplaySpeed?: number;
  className?: string;
}

export function TestimonialsSlider({
  testimonials,
  title = "What People Say",
  subtitle,
  background = 'light',
  autoplay = true,
  autoplaySpeed = 5000,
  className,
}: TestimonialsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to go to next slide
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  // Function to go to previous slide
  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  // Function to go to specific slide
  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };
  
  // Setup autoplay
  useEffect(() => {
    if (autoplay) {
      intervalRef.current = setInterval(nextSlide, autoplaySpeed);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, autoplaySpeed]);
  
  // Reset interval when manually changing slides
  useEffect(() => {
    if (autoplay && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(nextSlide, autoplaySpeed);
    }
  }, [activeIndex, autoplay, autoplaySpeed]);
  
  // Setup animations
  useEffect(() => {
    if (!sliderRef.current) return;
    
    const initAnimations = async () => {
      await animations.initGSAP?.();
      if (sliderRef.current) {
        animations.scrollReveal(sliderRef.current);
      }
    };
    
    initAnimations();
  }, []);
  
  // Get background class
  const bgClass = {
    'light': 'bg-light',
    'dark': 'bg-dark text-white',
    'primary': 'bg-primary text-white',
    'secondary': 'bg-secondary',
  }[background];

  return (
    <div 
      ref={sliderRef}
      className={cn(
        'py-16 px-6 md:py-24 md:px-8',
        bgClass,
        className
      )}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-heading font-display font-bold mb-4">{title}</h2>}
            {subtitle && <p className="text-body max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        
        {/* Testimonial Slider */}
        <div className="relative">
          {/* Testimonial Quotes */}
          <div className="overflow-hidden relative">
            <div 
              className="transition-all duration-700 ease-out"
              style={{ 
                transform: `translateX(-${activeIndex * 100}%)`,
                display: 'flex',
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 px-4 md:px-12"
                  style={{ minWidth: '100%' }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-8 md:p-10">
                    <div className="flex flex-col items-center text-center">
                      {/* Quote mark */}
                      <div className="text-accent text-5xl font-serif mb-6">&ldquo;</div>
                      
                      {/* Quote text */}
                      <blockquote className="text-lg md:text-xl leading-relaxed mb-6">
                        {testimonial.quote || testimonial.content}
                      </blockquote>
                      
                      {/* Author image */}
                      {(testimonial.image || testimonial.avatar) && (
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                          <img 
                            src={testimonial.image || testimonial.avatar} 
                            alt={testimonial.author}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}
                      
                      {/* Author info */}
                      <div>
                        <p className="font-semibold text-lg">{testimonial.author}</p>
                        {(testimonial.role || testimonial.company) && (
                          <p className="text-neutral-500 dark:text-neutral-400">
                            {testimonial.role}
                            {testimonial.role && testimonial.company && ', '}
                            {testimonial.company}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'w-3 h-3 rounded-full transition-all duration-300',
                    index === activeIndex 
                      ? 'bg-accent w-8' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-accent/70'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 transition-all duration-200"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
