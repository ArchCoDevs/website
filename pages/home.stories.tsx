import type { Meta, StoryObj } from '@storybook/react';
import homepageData from 'lib/mocks/sanity/homepage.json';
import globalsData from 'lib/mocks/sanity/globals.json';

import { Home } from './index.page';
import { handlers } from 'lib/mocks/handlers';
import { Homepage, Globals } from 'lib/types/sanity.types';

const meta: Meta<typeof Home> = {
  component: Home,
  title: 'Homepage',
  parameters: {
    actions: {
      handles: ['click']
    },
    overflow: 'hide-both',
    msw: {
      handlers: handlers
    }
  },
  args: {
    homepage: homepageData as unknown as Homepage,
    globals: globalsData as unknown as Globals
  }
};

export default meta;

type Story = StoryObj<typeof Home>;

export const Default: Story = {};
