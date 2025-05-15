
import React from 'react';
/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

// Improved import handling
import { render, screen } from '@testing-library/react';
import BookingSection from '@/components/BookingSection';

describe('BookingSection Component', () => {
  test('renders without crashing', () => {
    render(<BookingSection />);
    // Add specific assertions based on component's expected behavior
  });

  // Add more test cases as needed
});