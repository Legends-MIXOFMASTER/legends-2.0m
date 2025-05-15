#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

async function diagnoseTestConfiguration() {
  const projectRoot = process.cwd();
  const diagnosticReport = {
    nodeVersion: process.version,
    projectStructure: {},
    configFiles: {},
    moduleResolution: {}
  };

  // Check project structure
  diagnosticReport.projectStructure = {
    rootDir: projectRoot,
    clientSrc: fs.existsSync(path.join(projectRoot, 'client', 'src')),
    testFiles: fs.readdirSync(path.join(projectRoot, 'client', 'src', '__tests__'))
      .filter(file => file.endsWith('.test.ts') || file.endsWith('.test.tsx'))
  };

  // Check configuration files
  const configFiles = [
    'jest.config.js', 
    'tsconfig.json', 
    'babel.config.js', 
    '.env.local'
  ];

  configFiles.forEach(configFile => {
    const fullPath = path.join(projectRoot, configFile);
    diagnosticReport.configFiles[configFile] = fs.existsSync(fullPath);
  });

  // Attempt to load Jest configuration
  try {
    const jestConfig = await import(path.join(projectRoot, 'jest.config.js')).then(m => m.default);
    diagnosticReport.moduleResolution.jestConfig = {
      preset: jestConfig.preset,
      transform: Object.keys(jestConfig.transform || {}),
      moduleNameMapper: Object.keys(jestConfig.moduleNameMapper || {})
    };
  } catch (error) {
    diagnosticReport.moduleResolution.jestConfigError = error.message;
  }

  // Output diagnostic report
  console.log(JSON.stringify(diagnosticReport, null, 2));
}

diagnoseTestConfiguration().catch(console.error);
