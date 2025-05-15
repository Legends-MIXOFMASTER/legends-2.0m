#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

class ModuleLoaderDiagnostics {
  constructor() {
    this.projectRoot = process.cwd();
    this.diagnosticReport = {
      environment: {},
      moduleConfiguration: {},
      fileSystem: {},
      potentialIssues: [],
      recommendations: []
    };
  }

  collectEnvironmentInfo() {
    try {
      this.diagnosticReport.environment = {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        cwd: this.projectRoot,
        nodeModulesPath: path.join(this.projectRoot, 'node_modules')
      };
    } catch (error) {
      this.diagnosticReport.potentialIssues.push({
        type: 'ENVIRONMENT_INFO_ERROR',
        error: error.message
      });
    }
  }

  analyzePackageJson() {
    try {
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      this.diagnosticReport.moduleConfiguration = {
        type: packageJson.type || 'commonjs',
        engines: packageJson.engines,
        moduleResolutionStrategy: packageJson.moduleResolutionStrategy || 'default'
      };

      // Check for potential module resolution conflicts
      const moduleResolutionKeys = [
        'module', 'main', 'browser', 'exports'
      ];

      const moduleResolutionConflicts = moduleResolutionKeys
        .filter(key => packageJson[key])
        .map(key => ({ key, value: packageJson[key] }));

      if (moduleResolutionConflicts.length > 1) {
        this.diagnosticReport.potentialIssues.push({
          type: 'MULTIPLE_MODULE_RESOLUTION_CONFIGS',
          conflicts: moduleResolutionConflicts
        });
      }
    } catch (error) {
      this.diagnosticReport.potentialIssues.push({
        type: 'PACKAGE_JSON_PARSE_ERROR',
        error: error.message
      });
    }
  }

  checkFileSystemStructure() {
    try {
      const sourceDirs = [
        'client/src', 
        'server', 
        'shared', 
        'node_modules'
      ];

      this.diagnosticReport.fileSystem = sourceDirs.reduce((acc, dir) => {
        const fullPath = path.join(this.projectRoot, dir);
        try {
          acc[dir] = {
            exists: fs.existsSync(fullPath),
            isDirectory: fs.statSync(fullPath).isDirectory(),
            contents: fs.existsSync(fullPath) 
              ? fs.readdirSync(fullPath).slice(0, 10) 
              : []
          };
        } catch (error) {
          acc[dir] = { 
            exists: false, 
            error: error.message 
          };
        }
        return acc;
      }, {});
    } catch (error) {
      this.diagnosticReport.potentialIssues.push({
        type: 'FILE_SYSTEM_SCAN_ERROR',
        error: error.message
      });
    }
  }

  runNodeModuleDiagnostics() {
    try {
      // Check node_modules integrity
      const nodeModulesPath = path.join(this.projectRoot, 'node_modules');
      const nodeModulesStat = fs.statSync(nodeModulesPath);

      this.diagnosticReport.nodeModules = {
        size: nodeModulesStat.size,
        lastModified: nodeModulesStat.mtime
      };

      // Attempt to resolve critical modules
      const criticalModules = [
        'react', 
        'typescript', 
        'jest', 
        'ts-jest', 
        '@testing-library/react'
      ];

      this.diagnosticReport.moduleResolution = criticalModules.reduce((acc, moduleName) => {
        try {
          const modulePath = require.resolve(moduleName);
          acc[moduleName] = {
            resolved: true,
            path: modulePath
          };
        } catch (error) {
          acc[moduleName] = {
            resolved: false,
            error: error.message
          };
        }
        return acc;
      }, {});
    } catch (error) {
      this.diagnosticReport.potentialIssues.push({
        type: 'NODE_MODULES_DIAGNOSTIC_ERROR',
        error: error.message
      });
    }
  }

  generateRecommendations() {
    this.diagnosticReport.recommendations = 
      this.diagnosticReport.potentialIssues.map(issue => {
        switch (issue.type) {
          case 'MULTIPLE_MODULE_RESOLUTION_CONFIGS':
            return 'Consolidate module resolution configurations in package.json';
          case 'PACKAGE_JSON_PARSE_ERROR':
            return 'Verify package.json syntax and structure';
          case 'FILE_SYSTEM_SCAN_ERROR':
            return 'Check source directory structures';
          case 'NODE_MODULES_DIAGNOSTIC_ERROR':
            return 'Reinstall node modules and verify dependencies';
          default:
            return 'Review module loading configuration';
        }
      });
  }

  runDiagnostics() {
    this.collectEnvironmentInfo();
    this.analyzePackageJson();
    this.checkFileSystemStructure();
    this.runNodeModuleDiagnostics();
    this.generateRecommendations();

    return this.diagnosticReport;
  }
}

function main() {
  const diagnostics = new ModuleLoaderDiagnostics();
  const report = diagnostics.runDiagnostics();
  
  try {
    console.log('Module Loader Diagnostic Report:', JSON.stringify(report, null, 2));
  } catch (error) {
    console.error('Error logging diagnostic report:', error);
    console.log('Partial Report:', report);
  }
}

main();
