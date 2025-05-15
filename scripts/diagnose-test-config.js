#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function checkTestConfiguration() {
  const projectRoot = path.resolve(__dirname, '..');
  const diagnosticReport = {
    projectStructure: {},
    testConfiguration: {},
    moduleResolution: {}
  };

  // Check project structure
  diagnosticReport.projectStructure = {
    rootDir: projectRoot,
    clientSrc: fs.existsSync(path.join(projectRoot, 'client', 'src')),
    testDir: fs.existsSync(path.join(projectRoot, 'client', 'src', '__tests__')),
    jestConfig: fs.existsSync(path.join(projectRoot, 'jest.config.js')),
    tsConfig: fs.existsSync(path.join(projectRoot, 'tsconfig.json'))
  };

  // Check Jest configuration
  try {
    const jestConfig = require(path.join(projectRoot, 'jest.config.js'));
    diagnosticReport.testConfiguration = {
      preset: jestConfig.preset,
      testEnvironment: jestConfig.testEnvironment,
      roots: jestConfig.roots,
      moduleNameMapper: Object.keys(jestConfig.moduleNameMapper || {})
    };
  } catch (error) {
    diagnosticReport.testConfiguration.error = error.message;
  }

  // Check module resolution
  try {
    const tsConfig = require(path.join(projectRoot, 'tsconfig.json'));
    diagnosticReport.moduleResolution = {
      baseUrl: tsConfig.compilerOptions.baseUrl,
      paths: Object.keys(tsConfig.compilerOptions.paths || {})
    };
  } catch (error) {
    diagnosticReport.moduleResolution.error = error.message;
  }

  console.log(JSON.stringify(diagnosticReport, null, 2));
}

checkTestConfiguration();
