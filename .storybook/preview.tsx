import {
  Meta,
  Story,
  Canvas,
  Description,
  ArgTypes,
  IconGallery,
  IconItem,
  ColorPalette,
  ColorItem,
  Subtitle,
  Primary,
  Source,
  Controls,
  Stories
} from '@storybook/blocks';
import { initialize, mswLoader } from 'msw-storybook-addon';
import LinkTo from '@storybook/addon-links/react';

import Badge from '@doc-blocks/badge';
import Tip from '@doc-blocks/tip';
import WorksWith from '@doc-blocks/works-with';
import Title from '@doc-blocks/title';
import Version from '@doc-blocks/version';

import 'styles/index.scss';
import { Preview } from '@storybook/react';
import { withNextAuth } from './decorators/withNextAuth';

const viewports = {
  iPhoneXR: {
    name: 'iPhone XR',
    styles: {
      width: '414px',
      height: '896px'
    }
  },
  iPhoneXS: {
    name: 'iPhone XS',
    styles: {
      width: '375px',
      height: '812px'
    }
  },
  iPhone5: {
    name: 'iPhone 5',
    styles: {
      width: '320px',
      height: '568px'
    }
  },
  iPadPro: {
    name: 'iPad Pro',
    styles: {
      width: '1024px',
      height: '1366px'
    }
  },
  iPad: {
    name: 'iPad (Other)',
    styles: {
      width: '768px',
      height: '1024px'
    }
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '1024px'
    }
  },
  ultrawide: {
    name: 'Ultrawide Desktop',
    styles: {
      width: '1600px',
      height: '1200px'
    }
  }
};

initialize({ onUnhandledRequest: 'bypass' });

export const parameters = {
  docs: {
    page: () => (
      <>
        <Title />
        <WorksWith />
        <Subtitle />
        <Description />
        <Primary />
        <Controls />
        <Stories />
      </>
    ),
    components: {
      Version,
      Meta,
      Story,
      Canvas,
      Primary,
      Source,
      Controls,
      Description,
      ArgTypes,
      IconGallery,
      IconItem,
      LinkTo,
      Badge,
      Title,
      Tip,
      WorksWith,
      ColorPalette,
      ColorItem
    }
  },
  options: {
    showSearchBox: true,
    storySort: {
      method: 'configure',
      includeName: true,
      order: [
        'Documentation',
        [
          'Introduction',
          'Coding Guidelines',
          ['General'],
          'Infrastructure Guidelines',
          'Design Guidelines',
          ['Introduction'],
          'Architectural Decisions',
          ['Introduction'],
          'Roadmap',
          'Known Issues',
          'Changelog'
        ],
        'Components',
        ['Docs', ['Docs']],
        'Partials',
        ['Docs', ['Docs']],
        'Pages',
        ['Docs', ['Docs']],
        'Templates',
        ['Docs', ['Docs']]
      ]
    }
  },
  layout: 'centered',
  viewport: {
    viewports
  },
  controls: {
    expanded: true
  }
};

const preview: Preview = {
  parameters,
  loaders: [mswLoader],
  decorators: [withNextAuth]
};

export default preview;
