import { Config } from '@jest/types';

const jestConfig = async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    testEnvironment: 'jest-environment-jsdom',
    testRegex: ['.*\\.spec\\.ts$', '.*\\.spec\\.tsx$'],
    preset: 'ts-jest',
    globals: {
      'ts-jest': {
        tsconfig: './tsconfig.jest.json',
      },
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };
};

export default jestConfig;
