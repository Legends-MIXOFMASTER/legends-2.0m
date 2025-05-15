import mixpanel from 'mixpanel-browser';
import { UserRole } from '@/utils/permissions';

// Analytics configuration
export const initAnalytics = () => {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '', {
    debug: process.env.NODE_ENV !== 'production',
    track_pageview: true,
    persistence: 'localStorage'
  });
};

// Centralized analytics service
export const Analytics = {
  // Track page views
  trackPageView: (pageName: string) => {
    mixpanel.track('Page View', { page: pageName });
  },

  // Track user authentication events
  trackAuth: (eventType: 'login' | 'logout' | 'register', userRole?: UserRole) => {
    mixpanel.track(`User ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`, {
      role: userRole
    });
  },

  // Track custom events
  trackEvent: (eventName: string, properties?: Record<string, any>) => {
    mixpanel.track(eventName, properties);
  },

  // Set user properties for tracking
  setUserProperties: (user: {
    id: string;
    email?: string;
    username?: string;
    role: UserRole
  }) => {
    mixpanel.identify(user.id);
    mixpanel.people.set({
      $email: user.email,
      $username: user.username,
      role: user.role
    });
  },

  // Reset user tracking
  reset: () => {
    mixpanel.reset();
  }
};
