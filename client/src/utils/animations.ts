// Animation libraries will be loaded dynamically if available
// This approach ensures the application works even when dependencies aren't installed
let gsap: any = null;
let ScrollTrigger: any = null;
let lenis: any = null;
let gsapInitialized = false;
let animationsAvailable = false;

// Initialize GSAP and plugins with safe fallbacks
const initGSAP = async () => {
  if (typeof window !== 'undefined' && !gsapInitialized) {
    try {
      // Try to import GSAP - catch any errors if the package isn't available
      const gsapModule = await import('gsap').catch(() => null);
      
      if (gsapModule) {
        gsap = gsapModule.gsap;
        
        try {
          const scrollTriggerModule = await import('gsap/ScrollTrigger').catch(() => null);
          if (scrollTriggerModule) {
            ScrollTrigger = scrollTriggerModule.ScrollTrigger;
            gsap.registerPlugin(ScrollTrigger);
          }
        } catch (error) {
          console.log('ScrollTrigger not available');
        }
        
        animationsAvailable = true;
        gsapInitialized = true;
      }
    } catch (error) {
      console.log('GSAP not available - animations will be disabled');
    }
    
    return { gsap, ScrollTrigger };
  }
  return { gsap: null, ScrollTrigger: null };
};

// Animation presets will be initialized after GSAP is loaded

// Animation presets for various components
export const animations = {
  // Initialize GSAP and plugins with safe fallbacks
  initGSAP: async () => {
    if (!gsapInitialized) {
      await initGSAP();
    }
    return gsap;
  },
  
  // Check if animations are available
  isAvailable: () => {
    return animationsAvailable;
  },
  
  // Fade-in animation
  fadeIn: (element: string | Element, delay = 0, duration = 0.6) => {
    return gsap.fromTo(
      element,
      { opacity: 0 },
      { opacity: 1, duration, delay, ease: 'power2.out' }
    );
  },
  
  // Slide-up animation
  slideUp: (element: string | Element, delay: number = 0, duration: number = 0.8, distance: number = 50) => {
    return gsap.from(element, {
      y: distance,
      opacity: 0,
      duration,
      delay,
      ease: "power2.out",
    });
  },
  
  // Staggered animation for multiple elements
  stagger: (elements: string | Element, delay: number = 0, staggerTime: number = 0.1, duration: number = 0.8) => {
    return gsap.from(elements, {
      y: 30,
      opacity: 0,
      duration,
      delay,
      stagger: staggerTime,
      ease: "power2.out",
    });
  },
  
  // Scroll-triggered animation
  scrollTrigger: (element: string | Element, animation: any, trigger?: string | Element, start: string = "top 80%") => {
    return ScrollTrigger.create({
      trigger: trigger || element,
      start,
      once: true,
      animation,
    });
  },
  
  // Scroll-triggered reveal animation
  scrollReveal: (element: string | Element, trigger?: string | Element, start: string = "top 80%") => {
    const anim = gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      paused: true,
      ease: "power2.out",
    });
    
    ScrollTrigger.create({
      trigger: trigger || element,
      start,
      once: true,
      onEnter: () => anim.play(),
    });
    
    return anim;
  },
  
  // Hover animation for elements
  hoverEffect: (element: Element, scale: number = 1.05) => {
    const timeline = gsap.timeline({ paused: true });
    
    timeline.to(element, {
      scale,
      duration: 0.3,
      ease: "power2.out",
    });
    
    element.addEventListener("mouseenter", () => timeline.play());
    element.addEventListener("mouseleave", () => timeline.reverse());
    
    return timeline;
  },
  
  // Parallax scroll effect
  parallax: (element: string | Element, speed: number = 0.5) => {
    return ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self: any) => {
        gsap.to(element, {
          y: self.progress * speed * 100,
          ease: "none",
        });
      },
    });
  },
  
  // Create a smooth scroll utility with Lenis (with fallback)
  initSmoothScroll: async () => {
    if (typeof window !== 'undefined') {
      try {
        const lenisModule = await import('lenis').catch(() => null);
        
        if (lenisModule) {
          const Lenis = lenisModule.default;
          
          const lenis = new Lenis({
            duration: 1.2,
            lerp: 0.1,
            wheelMultiplier: 1,
            infinite: false,
          });
          
          // Define the animation frame function outside of the block
          const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
          };
          
          requestAnimationFrame(raf);
          
          // Connect GSAP ScrollTrigger with Lenis if GSAP is loaded
          if (gsap && gsap.ticker) {
            gsap.ticker.add((time: number) => {
              lenis.raf(time * 1000);
            });
          }
          
          return lenis;
        }
      } catch (error) {
        console.log('Smooth scroll not available - using default browser scrolling');
      }
    }
    return null;
  }
};
