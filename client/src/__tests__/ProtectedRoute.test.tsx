import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { AuthService } from '../services/auth';

jest.mock('../services/auth');

describe('ProtectedRoute', () => {
  const mockAuthService = new AuthService() as jest.Mocked<AuthService>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children when authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(true);

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          } />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect to login when not authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(false);

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          } />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
