import * as Sentry from "@sentry/react";

// Error severity levels
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

// Error logging configuration
export const initErrorLogging = () => {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    enabled: process.env.NODE_ENV === 'production',
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay()
    ],
    tracesSampleRate: 0.1, // 10% of transactions sampled
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 0.5 // 50% of errors
  });
};

// Centralized error logging service
export const ErrorLogger = {
  // Log an error with optional context
  log: (error: Error | string, severity: ErrorSeverity = ErrorSeverity.ERROR, context?: Record<string, any>) => {
    try {
      switch (severity) {
        case ErrorSeverity.INFO:
          Sentry.captureMessage(error instanceof Error ? error.message : error, 'info');
          break;
        case ErrorSeverity.WARNING:
          Sentry.captureMessage(error instanceof Error ? error.message : error, 'warning');
          break;
        case ErrorSeverity.CRITICAL:
          Sentry.captureException(error instanceof Error ? error : new Error(error as string), {
            extra: context
          });
          break;
        default:
          Sentry.captureException(error instanceof Error ? error : new Error(error as string), {
            extra: context
          });
      }

      // Optional: Log to console in development
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[${severity.toUpperCase()}]`, error, context);
      }
    } catch (loggingError) {
      console.error('Error logging failed:', loggingError);
    }
  },

  // Set user context for tracking
  setUser: (user?: { id: string; email?: string; username?: string }) => {
    Sentry.setUser(user || null);
  },

  // Add custom breadcrumb for detailed tracking
  addBreadcrumb: (message: string, category?: string, data?: Record<string, any>) => {
    Sentry.addBreadcrumb({
      category: category || 'default',
      message,
      data,
      level: 'info'
    });
  }
};
