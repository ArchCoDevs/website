import type { Meta, StoryObj } from '@storybook/react';

import globalsData from 'lib/mocks/sanity/globals.json';

import Search from './index.page';

import { handlers } from 'lib/mocks/handlers';

import { Globals } from 'lib/types/sanity.types';

const meta: Meta<typeof Search> = {
  component: Search,
  title: 'Search',
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
    locationsData: [],
    searchOptions: {
      features: [],
      locations: [],
      uses: []
    },
    globals: globalsData as unknown as Globals
  }
};

export default meta;

type Story = StoryObj<typeof Search>;

export const Default: Story = {};
