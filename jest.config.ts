import { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/test/_setup.ts'],
};

export default config;
