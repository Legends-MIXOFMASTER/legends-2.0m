#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function debugTestConfiguration() {
  const projectRoot = process.cwd();
  const diagnosticReport = {
    moduleResolution: {},
    testFiles: [],
    configFiles: {}
  };

  // Check configuration files
  const configFiles = [
    'jest.config.mjs',
    'tsconfig.json',
    'package.json'
  ];

  configFiles.forEach(configFile => {
    const fullPath = path.join(projectRoot, configFile);
    try {
      const config = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      diagnosticReport.configFiles[configFile] = {
        exists: true,
        keys: Object.keys(config)
      };
    } catch (error) {
      diagnosticReport.configFiles[configFile] = {
        exists: fs.existsSync(fullPath),
        error: error.message
      };
    }
  });

  // Find test files
  const findTestFiles = (dir) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        findTestFiles(fullPath);
      } else if (file.name.endsWith('.test.ts') || file.name.endsWith('.test.tsx')) {
        diagnosticReport.testFiles.push(fullPath);
      }
    });
  };

  try {
    findTestFiles(path.join(projectRoot, 'client', 'src'));
  } catch (error) {
    console.error('Error finding test files:', error);
  }

  // Module resolution check
  try {
    const tsConfig = JSON.parse(fs.readFileSync(path.join(projectRoot, 'tsconfig.json'), 'utf8'));
    diagnosticReport.moduleResolution = {
      baseUrl: tsConfig.compilerOptions.baseUrl,
      paths: tsConfig.compilerOptions.paths
    };
  } catch (error) {
    diagnosticReport.moduleResolution.error = error.message;
  }

  console.log(JSON.stringify(diagnosticReport, null, 2));
}

debugTestConfiguration();
