import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom',  // Ensures Jest runs in a browser-like environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Path to setup file for testing library
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',  // Adjust as needed for your import paths
    '\\.(css|scss|sass)$': 'identity-obj-proxy',  // Mock CSS imports
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Use ts-jest to handle TS and TSX files
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],  // Ignore build artifacts
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],  // Include necessary file types
};

export default config;
