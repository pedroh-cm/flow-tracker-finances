const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^jspdf$': '<rootDir>/jest.mocks/jspdf.ts',
    '^html2canvas$': '<rootDir>/jest.mocks/html2canvas.ts',
  },
};

module.exports = createJestConfig(customJestConfig);
