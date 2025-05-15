#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import semver from 'semver';

class DependencyAuditor {
  constructor() {
    this.projectRoot = process.cwd();
    this.auditReport = {
      dependencies: {
        production: {},
        development: {}
      },
      conflicts: [],
      recommendations: []
    };
  }

  readPackageJson() {
    try {
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      this.auditReport.dependencies.production = packageJson.dependencies || {};
      this.auditReport.dependencies.development = packageJson.devDependencies || {};
    } catch (error) {
      this.auditReport.error = `Failed to read package.json: ${error.message}`;
    }
  }

  checkDependencyCompatibility() {
    const criticalDependencies = {
      react: '^18.0.0',
      typescript: '^5.0.0',
      jest: '^29.0.0',
      'ts-jest': '^29.0.0',
      '@testing-library/react': '^14.0.0',
      '@types/react': '^18.0.0'
    };

    Object.entries(criticalDependencies).forEach(([dep, requiredVersion]) => {
      const installedVersion = 
        this.auditReport.dependencies.production[dep] || 
        this.auditReport.dependencies.development[dep];

      if (!installedVersion) {
        this.auditReport.conflicts.push({
          type: 'MISSING_DEPENDENCY',
          dependency: dep,
          recommendedVersion: requiredVersion
        });
        return;
      }

      try {
        const isCompatible = semver.satisfies(
          semver.coerce(installedVersion), 
          requiredVersion
        );

        if (!isCompatible) {
          this.auditReport.conflicts.push({
            type: 'VERSION_CONFLICT',
            dependency: dep,
            installedVersion,
            recommendedVersion: requiredVersion
          });
        }
      } catch (error) {
        this.auditReport.conflicts.push({
          type: 'VERSION_PARSE_ERROR',
          dependency: dep,
          installedVersion,
          error: error.message
        });
      }
    });
  }

  checkModuleResolution() {
    try {
      const tsConfig = JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'tsconfig.json'), 'utf8'));
      const jestConfig = JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'jest.config.mjs'), 'utf8'));

      const tsPathAliases = Object.keys(tsConfig.compilerOptions.paths || {});
      const jestPathMappers = Object.keys(jestConfig.moduleNameMapper || {});

      // Check for path alias consistency
      const missingJestMappers = tsPathAliases.filter(
        alias => !jestPathMappers.some(mapper => mapper.includes(alias.replace(/\/\*$/, '')))
      );

      if (missingJestMappers.length) {
        this.auditReport.conflicts.push({
          type: 'MODULE_RESOLUTION_CONFLICT',
          missingJestMappers
        });
      }
    } catch (error) {
      this.auditReport.conflicts.push({
        type: 'CONFIG_PARSE_ERROR',
        error: error.message
      });
    }
  }

  generateRecommendations() {
    this.auditReport.recommendations = this.auditReport.conflicts.map(conflict => {
      switch (conflict.type) {
        case 'MISSING_DEPENDENCY':
          return `Install ${conflict.dependency}@${conflict.recommendedVersion}`;
        case 'VERSION_CONFLICT':
          return `Update ${conflict.dependency} from ${conflict.installedVersion} to ${conflict.recommendedVersion}`;
        case 'MODULE_RESOLUTION_CONFLICT':
          return `Add Jest module mappers for missing path aliases: ${conflict.missingJestMappers.join(', ')}`;
        default:
          return 'Review dependency configuration';
      }
    });
  }

  runAudit() {
    this.readPackageJson();
    this.checkDependencyCompatibility();
    this.checkModuleResolution();
    this.generateRecommendations();

    return this.auditReport;
  }
}

function main() {
  const auditor = new DependencyAuditor();
  const report = auditor.runAudit();
  try {
  console.log('Dependency Audit Report:', JSON.stringify(report, null, 2));
} catch (error) {
  console.error('Error logging audit report:', error);
  console.log('Partial Report:', report);
}
}

main();
