import { getJestConfig } from '@storybook/test-runner';

const defaultConfig = getJestConfig();

const config = {
    // The default Jest configuration comes from @storybook/test-runner
    ...defaultConfig,
    testTimeout: 60000
}

export default config;
