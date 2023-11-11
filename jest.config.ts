import { Config } from '@jest/types';

const jestConfig = async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    testRegex: ['.*\\.spec\\.ts$', '.*\\.spec\\.ts$'],
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
