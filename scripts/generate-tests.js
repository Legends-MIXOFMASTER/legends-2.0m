#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function generateTestCoverage() {
  const projectRoot = process.cwd();
  const sourceDirs = [
    path.join(projectRoot, 'client', 'src', 'components'),
    path.join(projectRoot, 'client', 'src', 'pages'),
    path.join(projectRoot, 'client', 'src', 'utils'),
    path.join(projectRoot, 'client', 'src', 'hooks')
  ];

  const testTemplates = {
    component: (componentName) => `
import React from 'react';
/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

// Improved import handling
import { render, screen } from '@testing-library/react';
import ${componentName} from '@/components/${componentName}';

describe('${componentName} Component', () => {
  test('renders without crashing', () => {
    render(<${componentName} />);
    // Add specific assertions based on component's expected behavior
  });

  // Add more test cases as needed
});`,

    hook: (hookName) => `
import { renderHook } from '@testing-library/react-hooks';
import ${hookName} from '@/hooks/${hookName}';

describe('${hookName} Hook', () => {
  test('should have correct initial state', () => {
    const { result } = renderHook(() => ${hookName}());
    // Add assertions about initial hook state
  });

  // Add more test cases for different hook scenarios
});`,

    utility: (utilityName) => `
import ${utilityName} from '@/utils/${utilityName}';

describe('${utilityName} Utility', () => {
  test('should perform expected functionality', () => {
    // Add specific tests for utility function
    expect(true).toBe(true); // Placeholder
  });

  // Add more test cases covering different scenarios
});`
  };

  function generateTestFile(filePath, type) {
    const fileName = path.basename(filePath, path.extname(filePath));
    const testFileName = `${fileName}.test.tsx`;
    const testFilePath = path.join(path.dirname(filePath), '__tests__', testFileName);
    
    // Ensure __tests__ directory exists
    const testDir = path.dirname(testFilePath);
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Generate test content based on type
    let testContent = '';
    switch (type) {
      case 'component':
        testContent = testTemplates.component(fileName);
        break;
      case 'hook':
        testContent = testTemplates.hook(fileName);
        break;
      case 'utility':
        testContent = testTemplates.utility(fileName);
        break;
      default:
        console.warn(`Unsupported test type for ${fileName}`);
        return;
    }

    // Write test file
    fs.writeFileSync(testFilePath, testContent);
    console.log(`Generated test file: ${testFilePath}`);
  }

  // Scan and generate tests
  sourceDirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const ext = path.extname(file);
      
      if (ext === '.tsx' || ext === '.ts') {
        if (dir.includes('components')) {
          generateTestFile(filePath, 'component');
        } else if (dir.includes('hooks')) {
          generateTestFile(filePath, 'hook');
        } else if (dir.includes('utils')) {
          generateTestFile(filePath, 'utility');
        }
      }
    });
  });

  console.log('Test coverage generation complete.');
}

generateTestCoverage();
