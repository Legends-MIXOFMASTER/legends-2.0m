declare module '@sentry/react' {
  export * from '@sentry/browser';
  export { init, captureException, captureMessage, addBreadcrumb, setUser } from '@sentry/browser';
}
