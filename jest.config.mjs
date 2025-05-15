/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/client/src/$1',
    '^@components/(.*)$': '<rootDir>/client/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/client/src/utils/$1',
    '^@hooks/(.*)$': '<rootDir>/client/src/hooks/$1',
    '^@pages/(.*)$': '<rootDir>/client/src/pages/$1'
  },
  transform: {
    '^.+\.tsx?$': ['ts-jest', {
      useESM: true,
      tsconfig: './tsconfig.json'
    }]
  },
  testMatch: ['<rootDir>/client/src/**/*.{test,spec}.{ts,tsx}'],
  roots: ['<rootDir>/client/src'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/'
  ],
  maxWorkers: '50%'
};

export default config;
                      "^.+\\.tsx?$":  [
                                          "ts-jest",
                                          {
                                              "tsconfig":  "./tsconfig.json",
                                              "useESM":  true
                                          }
                                      ]
                  },
    "coveragePathIgnorePatterns":  [
                                       "/node_modules/",
                                       "/dist/",
                                       "/coverage/"
                                   ],
    "collectCoverage":  true,
    "coverageReporters":  [
                              "text",
                              "lcov",
                              "html"
                          ],
    "modulePaths":  [
                        "\u003crootDir\u003e"
                    ],
    "preset":  "ts-jest/presets/default-esm",
    "maxWorkers":  "50%",
    "coverageDirectory":  "\u003crootDir\u003e/coverage",
    "moduleNameMapper":  {
                             "^@server/(.*)$":  "\u003crootDir\u003e/server/$1",
                             "^@utils/(.*)$":  "\u003crootDir\u003e/client/src/utils/$1",
                             "^@hooks/(.*)$":  "\u003crootDir\u003e/client/src/hooks/$1",
                             "^@shared/(.*)$":  "\u003crootDir\u003e/shared/$1",
                             "^@components/(.*)$":  "\u003crootDir\u003e/client/src/components/$1",
                             "^@pages/(.*)$":  "\u003crootDir\u003e/client/src/pages/$1",
                             "^@/(.*)$":  "\u003crootDir\u003e/client/src/$1"
                         },
    "extensionsToTreatAsEsm":  [
                                   ".ts",
                                   ".tsx"
                               ],
    "cacheDirectory":  "\u003crootDir\u003e/node_modules/.cache/jest",
    "testMatch":  [
                      "\u003crootDir\u003e/client/src/**/*.test.{ts,tsx}",
                      "\u003crootDir\u003e/client/src/**/*.spec.{ts,tsx}"
                  ],
    "setupFilesAfterEnv":  [
                               "\u003crootDir\u003e/jest.setup.js"
                           ],
    "roots":  [
                  "\u003crootDir\u003e/client/src"
              ]
}
