#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import semver from 'semver';

class VersionDiagnostics {
  constructor() {
    this.projectRoot = process.cwd();
    this.diagnosticReport = {
      environment: {},
      dependencies: {},
      configurations: {},
      recommendations: []
    };
  }

  getSystemVersions() {
    try {
      this.diagnosticReport.environment = {
        node: process.version,
        npm: execSync('npm --version').toString().trim(),
        platform: process.platform,
        arch: process.arch
      };
    } catch (error) {
      this.diagnosticReport.environment.error = error.message;
    }
  }

  validatePackageVersions() {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'package.json'), 'utf8'));
      const dependencies = packageJson.dependencies || {};
      const devDependencies = packageJson.devDependencies || {};

      const criticalDependencies = {
        react: '^18.0.0',
        typescript: '^5.0.0',
        jest: '^29.0.0',
        'ts-jest': '^29.0.0'
      };

      this.diagnosticReport.dependencies.versions = {};
      this.diagnosticReport.dependencies.compatibility = {};

      Object.entries(criticalDependencies).forEach(([dep, requiredVersion]) => {
        const installedVersion = dependencies[dep] || devDependencies[dep];
        
        if (!installedVersion) {
          this.diagnosticReport.dependencies.compatibility[dep] = 'NOT_INSTALLED';
          return;
        }

        const isCompatible = semver.satisfies(
          semver.coerce(installedVersion), 
          requiredVersion
        );

        this.diagnosticReport.dependencies.versions[dep] = installedVersion;
        this.diagnosticReport.dependencies.compatibility[dep] = isCompatible 
          ? 'COMPATIBLE' 
          : 'INCOMPATIBLE';
      });
    } catch (error) {
      this.diagnosticReport.dependencies.error = error.message;
    }
  }

  checkModuleResolution() {
    try {
      const tsConfig = JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'tsconfig.json'), 'utf8'));
      let jestConfig = {};
try {
  const jestConfigContent = fs.readFileSync(path.join(this.projectRoot, 'jest.config.mjs'), 'utf8');
  // Remove export default and surrounding braces
  const configJson = jestConfigContent
    .replace(/export\s+default\s*{/, '{')
    .replace(/};\s*$/, '}');
  jestConfig = JSON.parse(configJson);
} catch (error) {
  this.diagnosticReport.configurations.jestConfigError = error.message;
}

      this.diagnosticReport.configurations = {
        typescript: {
          moduleResolution: tsConfig.compilerOptions.moduleResolution,
          paths: Object.keys(tsConfig.compilerOptions.paths || {})
        },
        jest: {
          moduleNameMapper: Object.keys(jestConfig.moduleNameMapper || {}),
          transformOptions: jestConfig.transform
        }
      };

      // Check for potential conflicts
      const pathConflicts = this.detectPathConflicts(
        tsConfig.compilerOptions.paths, 
        jestConfig.moduleNameMapper
      );

      this.diagnosticReport.moduleResolutionIssues = pathConflicts;
    } catch (error) {
      this.diagnosticReport.configurations.error = error.message;
    }
  }

  detectPathConflicts(tsPaths, jestMapper) {
    const conflicts = [];
    
    if (tsPaths && jestMapper) {
      Object.keys(tsPaths).forEach(tsPath => {
        const jestEquivalent = Object.keys(jestMapper).find(
          mapper => mapper.replace(/\^\$/, '') === tsPath.replace(/\/\*$/, '')
        );

        if (!jestEquivalent) {
          conflicts.push({
            type: 'MISSING_JEST_MAPPING',
            path: tsPath
          });
        }
      });
    }

    return conflicts;
  }

  generateRecommendations() {
    const recommendations = [];

    // Version compatibility recommendations
    Object.entries(this.diagnosticReport.dependencies.compatibility || {}).forEach(
      ([dep, status]) => {
        if (status === 'INCOMPATIBLE') {
          recommendations.push(`Update ${dep} to a compatible version`);
        }
      }
    );

    // Module resolution recommendations
    if (this.diagnosticReport.moduleResolutionIssues?.length) {
      recommendations.push(
        'Resolve module resolution conflicts between TypeScript and Jest configurations'
      );
    }

    this.diagnosticReport.recommendations = recommendations;
  }

  runDiagnostics() {
    this.getSystemVersions();
    this.validatePackageVersions();
    this.checkModuleResolution();
    this.generateRecommendations();

    return this.diagnosticReport;
  }
}

function main() {
  const diagnostics = new VersionDiagnostics();
  const report = diagnostics.runDiagnostics();
  // Improved error handling and logging
if (report.configurations?.error) {
  console.error('Configuration Error:', report.configurations.error);
}

if (report.dependencies?.error) {
  console.error('Dependencies Error:', report.dependencies.error);
}

console.log('Full Diagnostic Report:', JSON.stringify(report, null, 2));
}

main();
