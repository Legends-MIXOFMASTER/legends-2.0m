/** @jest-environment jsdom */
import { type FC } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Test Component
const TestComponent: FC = () => (
  <div>
    <h1>Test Component</h1>
    <button onClick={() => localStorage.setItem('clicked', 'true')}>
      Click Me
    </button>
    <div data-testid="media-query" className="responsive">
      Media Query Test
    </div>
    <div data-testid="intersection" className="observer">
      Intersection Observer Test
    </div>
  </div>
);

describe('Test Environment Setup', () => {
  it('renders components correctly', () => {
    render(<TestComponent />);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('handles localStorage correctly', async () => {
    render(<TestComponent />);
    const button = screen.getByText('Click Me');
    await userEvent.click(button);
    expect(localStorage.setItem).toHaveBeenCalledWith('clicked', 'true');
  });

  it('mocks matchMedia correctly', () => {
    render(<TestComponent />);
    expect(window.matchMedia).toHaveBeenCalled();
  });

  it('mocks IntersectionObserver correctly', () => {
    const observer = new IntersectionObserver(() => {});
    expect(observer.observe).toBeDefined();
    expect(observer.unobserve).toBeDefined();
    expect(observer.disconnect).toBeDefined();
  });

  it('mocks fetch correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' })
    });

    const response = await fetch('/api/test');
    expect(response.ok).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith('/api/test');
  });

  it('mocks console methods correctly', () => {
    console.error('test error');
    console.warn('test warning');
    expect(console.error).toHaveBeenCalledWith('test error');
    expect(console.warn).toHaveBeenCalledWith('test warning');
  });
});
