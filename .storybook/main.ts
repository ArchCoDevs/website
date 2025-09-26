import path from 'path';
import { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: path.resolve(__dirname, '../next.config.js')
    }
  },
  stories: [
    {
      // 👇 The directory field sets the directory your stories
      directory: './.docs',
      // 👇 The titlePrefix field will generate automatic titles for your stories
      titlePrefix: 'Documentation',
      // 👇 Storybook will load all files that contain the mdx extension
      files: '**/*.mdx'
    },
    {
      directory: '../components',
      titlePrefix: 'Components',
      files: '**/*.@(stories.tsx|mdx)'
    },
    {
      directory: '../partials',
      titlePrefix: 'Partials',
      files: '**/*.@(stories.tsx|mdx)'
    },
    {
      directory: '../pages',
      titlePrefix: 'Pages',
      files: '**/*.@(stories.tsx|mdx)'
    },
    {
      directory: '../templates',
      titlePrefix: 'Templates',
      files: '**/*.@(stories.tsx|mdx)'
    }
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-interactions',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    'msw-storybook-addon'
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    }
  },
  staticDirs: [
    {
      from: '../public',
      to: '/'
    },
    {
      from: '../public/favicons',
      to: '/'
    },
    {
      from: '../lib/mocks',
      to: '/mocks'
    },
    {
      from: './.docs/images',
      to: '/images'
    }
  ],
  docs: {}
};
export default config;
