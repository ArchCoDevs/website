import { injectAxe, checkA11y } from 'axe-playwright';
import type { TestRunnerConfig } from '@storybook/test-runner';

/*
 * See https://storybook.js.org/docs/7.0/react/writing-tests/test-runner#test-hook-api-experimental
 * to learn more about the test-runner hooks API.
 */
const a11yConfig: TestRunnerConfig = {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page) {
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      verbose: false,
      detailedReportOptions: {
        html: true
      }
    });
    // Run snapshot tests
    // const elementHandler = await page.$('#storybook-root');
    // const innerHTML = await elementHandler?.innerHTML();
    // expect(innerHTML).toMatchSnapshot();
  }
};

module.exports = a11yConfig;
