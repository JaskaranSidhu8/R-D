import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest preset to handle TypeScript
  testEnvironment: 'jsdom', // Use jsdom for testing React components
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // Mocks CSS imports
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
    '^.+\\.jsx?$': 'babel-jest',   // Transform JavaScript and JSX files
  },
  transformIgnorePatterns: [
    '/node_modules/', // Ensure to transform node_modules if necessary
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
