// jest.config.js
const nextJest = require('next/jest');

// Provide the path to your Next.js app to load next.config.js and .env variables in tests
const createJestConfig = nextJest({
  dir: './', // path to your Next.js app
});

// All custom Jest configuration will go here
const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Necessary for testing React components
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest', // Use ts-jest to transpile TypeScript
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  // Optional: Configure transformIgnorePatterns if needed
  transformIgnorePatterns: [
    '/node_modules/(?!your-module-name|another-module-name)', // Include any module that needs transformation
  ],
};

// Export the Jest configuration
module.exports = createJestConfig(customJestConfig);
