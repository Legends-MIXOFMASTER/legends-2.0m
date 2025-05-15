
import React from 'react';
/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

// Improved import handling
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';

describe('Navbar Component', () => {
  test('renders without crashing', () => {
    render(<Navbar />);
    // Add specific assertions based on component's expected behavior
  });

  // Add more test cases as needed
});