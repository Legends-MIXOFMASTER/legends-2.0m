declare module 'mixpanel-browser' {
  export function init(token: string, config?: {
    debug?: boolean;
    track_pageview?: boolean;
    persistence?: string;
  }): void;

  export function track(eventName: string, properties?: Record<string, any>): void;
  export function identify(id: string): void;
  export function people: {
    set(properties: Record<string, any>): void;
  };
  export function reset(): void;
}
