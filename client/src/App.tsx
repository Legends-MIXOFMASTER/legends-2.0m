import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import Login from "@/pages/Login";
import HouseOfLegendsAbout from "@/pages/about/HouseOfLegends";
import LegendsOfCocktailsAbout from "@/pages/about/LegendsOfCocktails";
import NamibianBarMastersAbout from "@/pages/about/NamibianBarMasters";
import NotFound from "@/pages/not-found";
import { ReactNode, useEffect } from "react";

// Protected route component
function ProtectedRoute({ 
  component: Component, 
  ...rest 
}: { 
  component: React.ComponentType<any>,
  [key: string]: any 
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to login if not authenticated and not loading
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Show loading or component based on auth state
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  // Return component if authenticated
  return isAuthenticated ? <Component {...rest} /> : null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/login" component={Login} />
      <Route path="/about/house-of-legends" component={HouseOfLegendsAbout} />
      <Route path="/about/legends-of-cocktails" component={LegendsOfCocktailsAbout} />
      <Route path="/about/namibian-bar-masters" component={NamibianBarMastersAbout} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
