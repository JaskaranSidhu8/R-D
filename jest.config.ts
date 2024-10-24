import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom',  // Ensure the environment is 'jsdom' for browser-like testing
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Make sure the setup file path is correct
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',  // Map imports like @/components to actual directories
    '\\.(css|scss|sass)$': 'identity-obj-proxy',  // Mock CSS imports to prevent errors
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',  // Transform TypeScript and JavaScript files with ts-jest
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],  // Ignore build files and node_modules
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],  // Allow these file extensions
};

export default config;
