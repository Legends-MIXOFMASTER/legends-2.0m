#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

class TestTroubleshooter {
  constructor() {
    this.projectRoot = process.cwd();
    this.diagnosticReport = {
      issues: [],
      recommendations: []
    };
  }

  checkNodeVersion() {
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.split('.')[0].replace('v', ''));
    
    if (majorVersion < 18) {
      this.diagnosticReport.issues.push({
        type: 'node_version',
        message: `Unsupported Node.js version: ${nodeVersion}. Recommended: >=18.0.0`
      });
    }
  }

  validateTestDependencies() {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'package.json'), 'utf8'));
      const requiredTestDeps = [
        '@testing-library/react', 
        '@testing-library/jest-dom', 
        'jest', 
        'ts-jest'
      ];

      const missingDeps = requiredTestDeps.filter(dep => 
        !packageJson.devDependencies?.[dep]
      );

      if (missingDeps.length > 0) {
        this.diagnosticReport.issues.push({
          type: 'missing_dependencies',
          message: `Missing test dependencies: ${missingDeps.join(', ')}`
        });
      }
    } catch (error) {
      this.diagnosticReport.issues.push({
        type: 'package_json_error',
        message: `Error reading package.json: ${error.message}`
      });
    }
  }

  checkTestFileStructure() {
    const testDirs = [
      path.join(this.projectRoot, 'client', 'src', '__tests__'),
      path.join(this.projectRoot, 'client', 'src', 'components', '__tests__')
    ];

    const missingDirs = testDirs.filter(dir => !fs.existsSync(dir));
    
    if (missingDirs.length > 0) {
      this.diagnosticReport.issues.push({
        type: 'test_directory_structure',
        message: `Missing test directories: ${missingDirs.join(', ')}`
      });
    }
  }

  validateJestConfig() {
    try {
      const jestConfig = require(path.join(this.projectRoot, 'jest.config.mjs'));
      const requiredKeys = [
        'preset', 
        'testEnvironment', 
        'moduleNameMapper', 
        'transform'
      ];

      const missingKeys = requiredKeys.filter(key => !jestConfig[key]);

      if (missingKeys.length > 0) {
        this.diagnosticReport.issues.push({
          type: 'jest_config_incomplete',
          message: `Missing Jest configuration keys: ${missingKeys.join(', ')}`
        });
      }
    } catch (error) {
      this.diagnosticReport.issues.push({
        type: 'jest_config_error',
        message: `Error reading Jest configuration: ${error.message}`
      });
    }
  }

  generateRecommendations() {
    this.diagnosticReport.recommendations = [
      'Ensure all test dependencies are installed',
      'Verify Node.js version compatibility',
      'Check Jest and TypeScript configuration',
      'Create missing test directories',
      'Review import aliases and module resolution'
    ];
  }

  runDiagnostics() {
    this.checkNodeVersion();
    this.validateTestDependencies();
    this.checkTestFileStructure();
    this.validateJestConfig();
    this.generateRecommendations();

    return this.diagnosticReport;
  }
}

function main() {
  const troubleshooter = new TestTroubleshooter();
  const report = troubleshooter.runDiagnostics();
  try {
  console.log('Diagnostic Report:', JSON.stringify(report, null, 2));
} catch (error) {
  console.error('Error logging diagnostic report:', error);
  console.log('Partial Report:', report);
}
}

main();
