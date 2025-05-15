#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function setupTestingEnvironment() {
  const projectRoot = process.cwd();
  
  // Ensure test directories exist
  const testDirs = [
    path.join(projectRoot, 'client', 'src', '__tests__')
  ];
  
  testDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created test directory: ${dir}`);
    }
  });

  // Create sample test files
  const sampleTestFiles = [
    {
      path: path.join(projectRoot, 'client', 'src', '__tests__', 'sample.test.tsx'),
      content: `
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Sample Test Suite', () => {
  test('renders without crashing', () => {
    render(<div data-testid="test-element">Test Component</div>);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});`
    }
  ];

  sampleTestFiles.forEach(file => {
    fs.writeFileSync(file.path, file.content);
    console.log(`Created sample test file: ${file.path}`);
  });

  // Install or update testing dependencies
  const testingDependencies = [
    '@testing-library/react',
    '@testing-library/jest-dom',
    '@types/jest',
    'jest',
    'ts-jest'
  ];

  try {
    execSync(`npm install -D ${testingDependencies.join(' ')}`, { stdio: 'inherit' });
    console.log('Updated testing dependencies');
  } catch (error) {
    console.error('Failed to install testing dependencies:', error);
  }

  console.log('Testing environment setup complete.');
}

setupTestingEnvironment();
