import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import Login from "@/pages/Login";
import HouseOfLegendsAbout from "@/pages/about/HouseOfLegends";
import LegendsOfCocktailsAbout from "@/pages/about/LegendsOfCocktails";
import NamibianBarMastersAbout from "@/pages/about/NamibianBarMasters";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import "@fontsource/inter/variable.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./styles/globals.css";

// Protected route component
function ProtectedRoute({ 
  component: Component, 
  ...rest 
}: { 
  component: React.ComponentType<any>,
  [key: string]: any 
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to login if not authenticated and not loading
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Show loading or component based on auth state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="glass-card p-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  
  // Return component if authenticated
  return isAuthenticated ? (
    <PageTransition>
      <Component {...rest} />
    </PageTransition>
  ) : null;
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        {() => (
          <PageTransition>
            <Home />
          </PageTransition>
        )}
      </Route>
      <Route path="/gallery">
        {() => (
          <ProtectedRoute component={Gallery} />
        )}
      </Route>
      <Route path="/login">
        {() => (
          <PageTransition>
            <Login />
          </PageTransition>
        )}
      </Route>
      <Route path="/about/house-of-legends">
        {() => (
          <PageTransition>
            <HouseOfLegendsAbout />
          </PageTransition>
        )}
      </Route>
      <Route path="/about/legends-of-cocktails">
        {() => (
          <PageTransition>
            <LegendsOfCocktailsAbout />
          </PageTransition>
        )}
      </Route>
      <Route path="/about/namibian-bar-masters">
        {() => (
          <PageTransition>
            <NamibianBarMastersAbout />
          </PageTransition>
        )}
      </Route>
      <Route>
        {() => (
          <PageTransition>
            <NotFound />
          </PageTransition>
        )}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Layout>
            <Toaster />
            <Router />
          </Layout>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
