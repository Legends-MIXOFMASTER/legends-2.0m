#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function analyzeModuleResolution() {
  const projectRoot = process.cwd();
  const diagnosticReport = {
    projectStructure: {},
    moduleAliases: {},
    importIssues: []
  };

  // Project structure analysis
  const sourceDirs = [
    path.join(projectRoot, 'client', 'src'),
    path.join(projectRoot, 'server'),
    path.join(projectRoot, 'shared')
  ];

  sourceDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      diagnosticReport.projectStructure[dir] = fs.readdirSync(dir);
    }
  });

  // Module alias analysis
  try {
    const tsConfig = JSON.parse(fs.readFileSync(path.join(projectRoot, 'tsconfig.json'), 'utf8'));
    const paths = tsConfig.compilerOptions?.paths || {};
    
    diagnosticReport.moduleAliases = Object.entries(paths).reduce((acc, [alias, resolvedPaths]) => {
      acc[alias] = resolvedPaths.map(p => path.join(projectRoot, p));
      return acc;
    }, {});
  } catch (error) {
    diagnosticReport.moduleAliasError = error.message;
  }

  // Import issue detection
  function checkImports(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        checkImports(fullPath);
      } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const importRegex = /import\s+.*\s+from\s+['"]([^'"]+)['"]/g;
          let match;
          
          while ((match = importRegex.exec(content)) !== null) {
            const importPath = match[1];
            
            // Check for problematic imports
            if (importPath.startsWith('.') || importPath.includes('@/')) {
              const resolvedPath = path.resolve(path.dirname(fullPath), importPath);
              
              if (!fs.existsSync(resolvedPath) && !importPath.startsWith('@/')) {
                diagnosticReport.importIssues.push({
                  file: fullPath,
                  importPath: importPath,
                  resolvedPath: resolvedPath
                });
              }
            }
          }
        } catch (error) {
          console.error(`Error processing ${fullPath}:`, error);
        }
      }
    });
  }

  checkImports(path.join(projectRoot, 'client', 'src'));

  console.log(JSON.stringify(diagnosticReport, null, 2));
}

analyzeModuleResolution();
