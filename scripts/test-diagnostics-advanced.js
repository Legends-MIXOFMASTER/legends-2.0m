#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function advancedTestDiagnostics() {
  const projectRoot = process.cwd();
  const diagnosticReport = {
    environment: {
      nodeVersion: process.version,
      platform: process.platform
    },
    configurations: {},
    dependencies: {},
    testEnvironment: {}
  };

  // Check configurations
  const configFiles = [
    'jest.config.mjs',
    'tsconfig.json',
    'babel.config.js',
    'package.json'
  ];

  configFiles.forEach(configFile => {
    const fullPath = path.join(projectRoot, configFile);
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      diagnosticReport.configurations[configFile] = {
        exists: true,
        size: content.length,
        hasImportAliases: content.includes('@/')
      };
    } catch (error) {
      diagnosticReport.configurations[configFile] = {
        exists: false,
        error: error.message
      };
    }
  });

  // Check dependencies
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
    diagnosticReport.dependencies = {
      testDependencies: Object.keys(packageJson.devDependencies || {})
        .filter(dep => dep.includes('jest') || dep.includes('test') || dep.includes('testing'))
    };
  } catch (error) {
    diagnosticReport.dependencies.error = error.message;
  }

  // Test environment check
  try {
    const jestConfig = import(path.join(projectRoot, 'jest.config.mjs'));
    diagnosticReport.testEnvironment = {
      preset: jestConfig.preset,
      testEnvironment: jestConfig.testEnvironment,
      roots: jestConfig.roots
    };
  } catch (error) {
    diagnosticReport.testEnvironment.error = error.message;
  }

  // Run additional diagnostics
  try {
    const testFiles = execSync('find client/src -name "*.test.ts" -o -name "*.test.tsx"', { encoding: 'utf8' });
    diagnosticReport.testFiles = testFiles.trim().split('\n');
  } catch (error) {
    diagnosticReport.testFileDiscovery = error.message;
  }

  console.log(JSON.stringify(diagnosticReport, null, 2));
}

advancedTestDiagnostics();
