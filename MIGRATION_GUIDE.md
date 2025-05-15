# Legends of Cocktails: ES Module Migration Guide

## Overview
This guide provides a comprehensive approach to migrating the Legends of Cocktails project to ES Modules, improving module resolution, and modernizing the project's dependency management.

## 1. Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- TypeScript >= 5.0.0

## 2. Module Resolution Strategy

### 2.1 Package Configuration
Update `package.json`:
```json
{
  "type": "module",
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "exports": {
    ".": "./index.js",
    "./client/*": "./client/src/*",
    "./server/*": "./server/*"
  }
}
```

### 2.2 TypeScript Configuration
Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true
  }
}
```

### 2.3 Jest Configuration
Update `jest.config.mjs`:
```javascript
export default {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  }
}
```

## 3. Import/Export Transformation

### 3.1 CommonJS to ES Module Conversion
- Replace `require()` with `import`
- Replace `module.exports` with `export`

#### Example Transformation
```javascript
// Before (CommonJS)
const express = require('express');
module.exports = app;

// After (ES Module)
import express from 'express';
export default app;
```

### 3.2 File Extensions
- Use `.mjs` for pure ES Modules
- Use `.js` for transpiled modules
- Add file extensions in import statements

#### Example
```javascript
// Correct
import { someFunction } from './utils.js';
```

## 4. Dependency Management

### 4.1 Recommended Dependencies
```bash
npm install --save-dev \
  typescript@^5.0.0 \
  @types/node@^18.0.0 \
  @types/react@^18.0.0 \
  jest@^29.0.0 \
  ts-jest@^29.0.0 \
  @testing-library/react@^14.0.0
```

### 4.2 Scripts Update
```json
{
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
    "lint": "eslint . --ext .ts,.tsx",
    "typecheck": "tsc --noEmit"
  }
}
```

## 5. Common Migration Challenges

### 5.1 Dynamic Imports
Use dynamic `import()` for conditional or runtime module loading:
```javascript
const module = await import('./dynamicModule.js');
```

### 5.2 __dirname and __filename
Replace with:
```javascript
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

## 6. Troubleshooting

### 6.1 Potential Issues
- Missing file extensions
- Incorrect module resolution
- Incompatible dependencies

### 6.2 Debugging
- Use `--experimental-vm-modules` flag
- Verify Node.js and npm versions
- Check module path configurations

## 7. Recommended Tools
- `npm-check-updates`
- `typescript-eslint`
- `jest-environment-jsdom`

## 8. Continuous Integration
Update GitHub Actions workflow to use Node.js 18.x or later.

## Conclusion
Migrating to ES Modules requires careful planning and incremental updates. Test thoroughly and address issues systematically.

**Happy Coding! 🚀**
