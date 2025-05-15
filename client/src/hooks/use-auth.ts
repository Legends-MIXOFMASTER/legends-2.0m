import { useState, useEffect, createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';

// Define user type based on our JWT token payload
export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  role: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

// Define register data type
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  role?: string;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Base API URL
const API_URL = '/api/auth';

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // Check if token is expired
  const isTokenExpired = (token: string): boolean => {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  // Get token from localStorage
  const getToken = (): string | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    // If token is expired, remove it
    if (isTokenExpired(token)) {
      localStorage.removeItem('token');
      return null;
    }
    
    return token;
  };

  // Parse user from token
  const parseUserFromToken = (token: string): User | null => {
    try {
      const decoded: any = jwtDecode(token);
      return {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email || '',
        fullName: decoded.fullName,
        role: decoded.role
      };
    } catch {
      return null;
    }
  };

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      setUser(parseUserFromToken(data.token));
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      setUser(parseUserFromToken(data.token));
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  // Refresh token
  const refreshTokenMutation = useMutation({
    mutationFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No token found');

      const response = await fetch(`${API_URL}/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // If refresh fails, logout
        localStorage.removeItem('token');
        setUser(null);
        throw new Error('Token refresh failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      setUser(parseUserFromToken(data.token));
    },
  });

  // Get current user data
  const { isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = getToken();
      if (!token) return null;

      const response = await fetch(`${API_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // If getting user data fails, try to refresh token
        try {
          await refreshTokenMutation.mutateAsync();
          return null;
        } catch {
          localStorage.removeItem('token');
          return null;
        }
      }

      return response.json();
    },
    enabled: !!getToken(),
    onSuccess: (data) => {
      if (data) {
        setUser(data);
      }
    },
    onError: () => {
      localStorage.removeItem('token');
      setUser(null);
    },
  });

  // Load user from token on first render
  useEffect(() => {
    const token = getToken();
    if (token) {
      const parsedUser = parseUserFromToken(token);
      if (parsedUser) {
        setUser(parsedUser);
      }
    }
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  // Auth context value
  const authContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,
    error: error as Error || loginMutation.error || registerMutation.error,
    login: (credentials) => loginMutation.mutateAsync(credentials),
    register: (userData) => registerMutation.mutateAsync(userData),
    logout,
    refreshToken: () => refreshTokenMutation.mutateAsync(),
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
