#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import semver from 'semver';

class DependencyCleanup {
  constructor() {
    this.projectRoot = process.cwd();
    this.cleanupReport = {
      initialState: {},
      dependencyUpdates: [],
      removedDependencies: [],
      conflicts: [],
      recommendations: []
    };
  }

  readPackageJson() {
    try {
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      this.cleanupReport.initialState = {
        dependencies: packageJson.dependencies || {},
        devDependencies: packageJson.devDependencies || {},
        scripts: packageJson.scripts || {},
        type: packageJson.type || 'commonjs'
      };

      return packageJson;
    } catch (error) {
      throw new Error(`Failed to read package.json: ${error.message}`);
    }
  }

  identifyDependencyIssues(packageJson) {
    const criticalDependencies = {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      typescript: '^5.0.0',
      jest: '^29.5.0',
      'ts-jest': '^29.1.0',
      '@testing-library/react': '^14.0.0',
      '@types/react': '^18.0.0',
      '@types/jest': '^29.0.0'
    };

    const deprecatedOrConflictingDependencies = [
      'react-scripts',  // Replaced by more modern tooling
      'create-react-app',
      'tslint',  // Replaced by ESLint
      'webpack',  // Typically managed by framework
      'babel-core'  // Replaced by modern transpilers
    ];

    // Check for outdated or conflicting dependencies
    deprecatedOrConflictingDependencies.forEach(dep => {
      if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
        this.cleanupReport.conflicts.push({
          type: 'DEPRECATED_DEPENDENCY',
          dependency: dep
        });
      }
    });

    // Validate and update critical dependencies
    Object.entries(criticalDependencies).forEach(([dep, requiredVersion]) => {
      const installedVersion = 
        packageJson.dependencies?.[dep] || 
        packageJson.devDependencies?.[dep];

      if (!installedVersion) {
        this.cleanupReport.dependencyUpdates.push({
          dependency: dep,
          action: 'INSTALL',
          version: requiredVersion
        });
        return;
      }

      try {
        const isCompatible = semver.satisfies(
          semver.coerce(installedVersion), 
          requiredVersion
        );

        if (!isCompatible) {
          this.cleanupReport.dependencyUpdates.push({
            dependency: dep,
            action: 'UPDATE',
            currentVersion: installedVersion,
            recommendedVersion: requiredVersion
          });
        }
      } catch (error) {
        this.cleanupReport.conflicts.push({
          type: 'VERSION_PARSE_ERROR',
          dependency: dep,
          installedVersion,
          error: error.message
        });
      }
    });
  }

  updatePackageJson(packageJson) {
    // Prepare updated package.json
    const updatedPackageJson = { ...packageJson };

    // Update module type
    updatedPackageJson.type = 'module';

    // Update scripts for ES Module support
    const esModuleScripts = {
      'test': 'node --experimental-vm-modules node_modules/jest/bin/jest.js',
      'lint': 'eslint . --ext .ts,.tsx',
      'typecheck': 'tsc --noEmit'
    };

    updatedPackageJson.scripts = {
      ...updatedPackageJson.scripts,
      ...esModuleScripts
    };

    // Update engines
    updatedPackageJson.engines = {
      node: '>=18.0.0',
      npm: '>=9.0.0'
    };

    // Add export conditions
    updatedPackageJson.exports = {
      '.': './index.js',
      './client/*': './client/src/*',
      './server/*': './server/*'
    };

    // Write updated package.json
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    fs.writeFileSync(
      packageJsonPath, 
      JSON.stringify(updatedPackageJson, null, 2)
    );

    return updatedPackageJson;
  }

  generateRecommendations() {
    this.cleanupReport.recommendations = [
      ...this.cleanupReport.dependencyUpdates.map(update => 
        update.action === 'INSTALL'
          ? `Install missing dependency: ${update.dependency}@${update.version}`
          : `Update ${update.dependency} from ${update.currentVersion} to ${update.recommendedVersion}`
      ),
      ...this.cleanupReport.conflicts.map(conflict => {
        switch (conflict.type) {
          case 'DEPRECATED_DEPENDENCY':
            return `Remove deprecated dependency: ${conflict.dependency}`;
          case 'VERSION_PARSE_ERROR':
            return `Resolve version parsing issue for ${conflict.dependency}`;
          default:
            return 'Review dependency configuration';
        }
      }),
      'Migrate to ES Modules',
      'Update Node.js and npm configurations',
      'Review and update build and test scripts'
    ];
  }

  runCleanup() {
    try {
      const packageJson = this.readPackageJson();
      this.identifyDependencyIssues(packageJson);
      this.updatePackageJson(packageJson);
      this.generateRecommendations();

      return this.cleanupReport;
    } catch (error) {
      console.error('Dependency cleanup failed:', error);
      return { error: error.message };
    }
  }
}

function main() {
  const cleanup = new DependencyCleanup();
  const report = cleanup.runCleanup();
  
  try {
    console.log('Dependency Cleanup Report:', JSON.stringify(report, null, 2));
  } catch (error) {
    console.error('Error logging cleanup report:', error);
    console.log('Partial Report:', report);
  }
}

main();
