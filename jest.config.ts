// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom', // Use jsdom for testing React components
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // Mocks CSS imports
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript
    '^.+\\.jsx?$': 'babel-jest',   // Use babel-jest for JavaScript and JSX
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
