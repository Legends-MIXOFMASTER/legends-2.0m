import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, createContext, useContext } from "react";
import { apiRequest } from "@/lib/queryClient";

// Define user type
export type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  userType: string;
  phone?: string;
  experience?: string;
  bio?: string;
  isActive: boolean;
  createdAt?: string;
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  error: string | null;
};

// Create auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  // Get token from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  }, [queryClient]);
  
  // For development only - create a mock user when auth is not possible
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: authentication ready');
    }
  }, []);
  
  // User data query
  const { data: user, isLoading } = useQuery({ 
    queryKey: ["auth"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }
      
      try {
        const response = await apiRequest("/api/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        return response as User;
      } catch (error) {
        // Clear token if it's invalid
        localStorage.removeItem("token");
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10 // 10 minutes
  });
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      setError(null);
      
      try {
        const response = await apiRequest("/api/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        
        return response;
      } catch (error: any) {
        // Handle validation errors from backend
        if (error.response?.status === 400 || error.response?.status === 401) {
          throw new Error(error.response.data.message || "Invalid credentials");
        }
        
        throw new Error("Login failed. Please try again.");
      }
    },
    onSuccess: (data: any) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error: any) => {
      setError(error.message);
    }
  });
  
  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      setError(null);
      
      try {
        const response = await apiRequest("/api/register", {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json"
          }
        });
        
        return response;
      } catch (error: any) {
        // Handle validation errors from backend
        if (error.response?.status === 400) {
          throw new Error(error.response.data.message || "Registration failed. Please check your information.");
        }
        
        throw new Error("Registration failed. Please try again.");
      }
    },
    onSuccess: (data: any) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error: any) => {
      setError(error.message);
    }
  });
  
  // Login function
  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };
  
  // Register function
  const register = async (userData: any) => {
    await registerMutation.mutateAsync(userData);
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries({ queryKey: ["auth"] });
    queryClient.resetQueries({ queryKey: ["auth"] });
  };
  
  // Auth context value
  const authValue: AuthContextType = {
    user: user || null,
    isLoading: isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    error
  };
  
  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Auth hook for components
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}