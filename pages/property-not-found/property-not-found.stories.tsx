import type { Meta, StoryObj } from '@storybook/react';
import globalsData from 'lib/mocks/sanity/globals.json';
import { PropertyNotFound } from './index.page';
import { handlers } from 'lib/mocks/handlers';
import { Globals } from 'lib/types/sanity.types';

const meta: Meta<typeof PropertyNotFound> = {
  component: PropertyNotFound,
  title: 'Property Not Found',
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
    globals: globalsData as unknown as Globals
  }
};

export default meta;

type Story = StoryObj<typeof PropertyNotFound>;

export const Default: Story = {};
