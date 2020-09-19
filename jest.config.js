module.exports = {
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
        },
    },
    cacheDirectory: '<rootDir>/cache/jest',
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    // "setupTestFrameworkScriptFile": "<rootDir>/src/__tests__/setup.ts",
    testMatch: ['**/*.test.+(ts)'],
    moduleNameMapper: {
        '^src(.*)$': '<rootDir>/src$1',
    },
    roots: ['<rootDir>/src'],
    globalSetup: '<rootDir>/jestGlobalSetup.js',
    globalTeardown: '<rootDir>/jestGlobalTeardown.js',
    testEnvironment: 'node',
    // globalTeardown: '<rootDir>/src/__tests__/teardown.js',
    // testEnvironment: '<rootDir>/src/__tests__/mongo-environment.js'
};
