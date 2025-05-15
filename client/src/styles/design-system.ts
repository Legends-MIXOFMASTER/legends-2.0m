// Design System for Legends of Cocktails
// Based on Evive UI/UX principles for modern, minimalist design

export const DESIGN_SYSTEM = {
  // Layout Principles
  layout: {
    maxWidth: '1240px',
    fullViewportSections: true,
  },

  // Spacing System (in px)
  spacing: {
    section: {
      marginY: 'clamp(80px, 10vw, 120px)',
      paddingX: 'clamp(16px, 5vw, 40px)',
    },
    padding: {
      sm: '16px',
      md: 'clamp(24px, 5vw, 40px)',
      lg: 'clamp(40px, 8vw, 60px)',
    },
    grid: {
      gutter: 'clamp(16px, 2vw, 24px)',
    }
  },

  // Typography System
  typography: {
    fontFamily: {
      primary: '"Inter", "Satoshi", "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      secondary: '"Playfair Display", serif',
      body: '"Montserrat", sans-serif',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    fontSize: {
      // Responsive typography using clamp
      h1: 'clamp(3rem, 6vw, 6rem)',
      h2: 'clamp(2.5rem, 5vw, 4.5rem)',
      h3: 'clamp(2rem, 4vw, 3.5rem)',
      h4: 'clamp(1.5rem, 3vw, 2.5rem)',
      h5: 'clamp(1.25rem, 2vw, 2rem)',
      h6: 'clamp(1.1rem, 1.5vw, 1.5rem)',
      body: 'clamp(1rem, 1.5vw, 1.2rem)',
      small: 'clamp(0.875rem, 1vw, 1rem)',
    },
    lineHeight: {
      heading: '1.1',
      body: '1.6',
    },
  },

  // Color Palette
  colors: {
    primary: '#321D12', // Deep Brown
    secondary: '#FFF6E9', // Cream white
    accent: '#E6A756', // Gold
    dark: '#1A1A1A',
    light: '#F5F5F5',
    // Hover states
    primaryHover: '#4B2E1C',
    accentHover: '#F0B979',
    // UI elements
    background: '#FFFFFF',
    text: '#333333',
    error: '#E53935',
    success: '#43A047',
    warning: '#FFB300',
    info: '#2196F3',
  },

  // Effects
  effects: {
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '16px',
      xl: '24px',
      full: '9999px',
    },
    boxShadow: {
      sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      md: '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
      lg: '0 10px 25px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)',
      xl: '0 20px 40px rgba(0,0,0,0.1)',
    },
    glassmorphism: {
      light: 'backdrop-filter: blur(8px); background-color: rgba(255, 255, 255, 0.6);',
      dark: 'backdrop-filter: blur(8px); background-color: rgba(0, 0, 0, 0.6);',
    },
    transition: {
      fast: '0.2s ease',
      medium: '0.3s ease',
      slow: '0.5s ease',
    },
  },

  // Z-index layers
  zIndex: {
    hidden: -1,
    base: 0,
    raised: 1,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },

  // Breakpoints
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};
