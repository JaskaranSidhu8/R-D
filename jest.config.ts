import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom',  // Use jsdom for browser-like testing
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Ensure your setup file is configured correctly
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',  // Adjust your paths accordingly
    '\\.(css|scss|sass)$': 'identity-obj-proxy',  // Mock styles to prevent errors
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Use ts-jest to transform TypeScript files
  },
  transformIgnorePatterns: ['node_modules/(?!(your-module-name)/)'],  // Ensure this line is configured correctly
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],  // Ignore build directories
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],  // Include necessary file types
};

export default config;
