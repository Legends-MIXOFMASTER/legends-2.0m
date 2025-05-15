import { queryClient } from './queryClient';

const API_URL = '/api';

// API request helper with error handling
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    // Parse JSON response
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Authentication API
export const authApi = {
  login: async (username: string, password: string) => {
    return apiRequest<{token: string, user: any}>('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },
  
  register: async (userData: any) => {
    return apiRequest<{token: string, user: any}>('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  getUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token');
    
    return apiRequest<{user: any}>('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Bookings API
export const bookingsApi = {
  createBooking: async (bookingData: any) => {
    return apiRequest<{bookingId: string, message: string}>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },
  
  getBookings: async () => {
    const token = localStorage.getItem('token');
    
    return apiRequest<{bookings: any[]}>('/bookings', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
};

// Contact form API
export const contactApi = {
  sendMessage: async (contactData: any) => {
    return apiRequest<{contactId: string, message: string}>('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },
};

// Newsletter subscription API
export const newsletterApi = {
  subscribe: async (email: string) => {
    return apiRequest<{subscriberId: string, message: string}>('/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

// Course enrollment API
export const coursesApi = {
  getCourses: async () => {
    return apiRequest<{courses: any[]}>('/courses', {
      method: 'GET',
    });
  },
  
  enrollInCourse: async (enrollmentData: any) => {
    return apiRequest<{enrollmentId: string, message: string}>('/enrollments', {
      method: 'POST',
      body: JSON.stringify(enrollmentData),
    });
  },
};

// Freelancer registration API
export const freelancerApi = {
  register: async (freelancerData: any) => {
    return apiRequest<{freelancerId: string, message: string}>('/freelancers', {
      method: 'POST',
      body: JSON.stringify(freelancerData),
    });
  },
};

// Invalidate queries helper
export const invalidateQueries = (queryKey: string | string[]) => {
  queryClient.invalidateQueries({ queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] });
};

export default {
  auth: authApi,
  bookings: bookingsApi,
  contact: contactApi,
  newsletter: newsletterApi,
  courses: coursesApi,
  freelancer: freelancerApi,
};
