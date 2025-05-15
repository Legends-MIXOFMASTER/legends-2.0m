import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Loading component for lazy-loaded pages
export const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Loader2 className="animate-spin text-primary-500" size={48} />
  </div>
);

// Lazy load component with error boundary
export const lazyLoad = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>, 
  ErrorBoundary?: React.ComponentType<any>
) => {
  const LazyComponent = React.lazy(importFunc);

  return (props: any) => (
    <Suspense fallback={<LoadingFallback />}>
      {ErrorBoundary ? (
        <ErrorBoundary>
          <LazyComponent {...props} />
        </ErrorBoundary>
      ) : (
        <LazyComponent {...props} />
      )}
    </Suspense>
  );
};
