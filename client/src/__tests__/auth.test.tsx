import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '@/hooks/useAuth';
import Login from '@/pages/Login';
import { checkPermission, UserRole } from '@/utils/permissions';

// Mock authentication service
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    user: null,
    isAuthenticated: false
  })
}));

describe('Authentication Flow', () => {
  test('renders login form', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
    
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  test('validates login form', async () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
    
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'a' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/username must be at least 3 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });
});

describe('Role-Based Permissions', () => {
  test('permission checks for different roles', () => {
    // Client role permissions
    expect(checkPermission(UserRole.CLIENT, 'viewDashboard')).toBe(true);
    expect(checkPermission(UserRole.CLIENT, 'manageUsers')).toBe(false);

    // Admin role permissions
    expect(checkPermission(UserRole.ADMIN, 'accessAdminPanel')).toBe(true);
    expect(checkPermission(UserRole.ADMIN, 'manageCourses')).toBe(true);

    // Guest role permissions
    expect(checkPermission(UserRole.GUEST, 'viewDashboard')).toBe(false);
  });
});
