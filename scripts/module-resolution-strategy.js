#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

class ModuleResolutionStrategy {
  constructor() {
    this.projectRoot = process.cwd();
    this.resolutionReport = {
      pathAliases: {},
      moduleTypes: {},
      configurationIssues: [],
      recommendations: []
    };
  }

  analyzePathAliases() {
    try {
      const tsConfig = JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'tsconfig.json'), 'utf8'));
      const jestConfig = JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'jest.config.mjs'), 'utf8'));

      const tsPathAliases = tsConfig.compilerOptions.paths || {};
      const jestModuleMappers = jestConfig.moduleNameMapper || {};

      this.resolutionReport.pathAliases = {
        typescript: Object.keys(tsPathAliases),
        jest: Object.keys(jestModuleMappers)
      };

      // Check for alias consistency
      const missingJestMappers = Object.keys(tsPathAliases).filter(
        alias => !Object.keys(jestModuleMappers).some(
          mapper => mapper.includes(alias.replace(/\/\*$/, ''))
        )
      );

      if (missingJestMappers.length) {
        this.resolutionReport.configurationIssues.push({
          type: 'MISSING_JEST_MAPPERS',
          aliases: missingJestMappers
        });
      }
    } catch (error) {
      this.resolutionReport.configurationIssues.push({
        type: 'CONFIG_PARSE_ERROR',
        error: error.message
      });
    }
  }

  analyzeModuleTypes() {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'package.json'), 'utf8'));
      const tsConfig = JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'tsconfig.json'), 'utf8'));

      this.resolutionReport.moduleTypes = {
        packageType: packageJson.type || 'commonjs',
        typescriptModule: tsConfig.compilerOptions.module,
        typescriptTarget: tsConfig.compilerOptions.target
      };

      // Check for module type consistency
      const moduleTypeConsistency = [
        packageJson.type === 'module' && 
        tsConfig.compilerOptions.module === 'ESNext' && 
        tsConfig.compilerOptions.target.startsWith('ES')
      ];

      if (!moduleTypeConsistency) {
        this.resolutionReport.configurationIssues.push({
          type: 'MODULE_TYPE_INCONSISTENCY',
          details: this.resolutionReport.moduleTypes
        });
      }
    } catch (error) {
      this.resolutionReport.configurationIssues.push({
        type: 'CONFIG_PARSE_ERROR',
        error: error.message
      });
    }
  }

  generateRecommendations() {
    this.resolutionReport.recommendations = 
      this.resolutionReport.configurationIssues.map(issue => {
        switch (issue.type) {
          case 'MISSING_JEST_MAPPERS':
            return `Add Jest module mappers for aliases: ${issue.aliases.join(', ')}`;
          case 'MODULE_TYPE_INCONSISTENCY':
            return 'Align module types across package.json and tsconfig.json';
          case 'CONFIG_PARSE_ERROR':
            return 'Review and fix configuration files';
          default:
            return 'Review module resolution configuration';
        }
      });
  }

  runStrategy() {
    this.analyzePathAliases();
    this.analyzeModuleTypes();
    this.generateRecommendations();

    return this.resolutionReport;
  }
}

function main() {
  console.error('Current Working Directory:', process.cwd());
  console.error('Files in current directory:', fs.readdirSync('.'));
  const strategy = new ModuleResolutionStrategy();
  const report = strategy.runStrategy();
  
  try {
    console.log('Module Resolution Strategy Report:', JSON.stringify(report, null, 2));
  } catch (error) {
    console.error('Error logging strategy report:', error);
    console.log('Partial Report:', report);
  }
}

main();
