import type { Meta, StoryObj } from '@storybook/react';
import { handlers } from 'lib/mocks/handlers';
import { BaseLayout } from './index';
import globalsData from 'lib/mocks/sanity/globals.json';
import { Globals } from 'lib/types/sanity.types';

const meta: Meta<typeof BaseLayout> = {
  component: BaseLayout,
  args: {
    globals: globalsData as unknown as Globals
  },
  parameters: {
    overflow: 'hide-both',
    msw: {
      handlers: handlers
    }
  }
};

export default meta;

type Story = StoryObj<typeof BaseLayout>;

export const Default: Story = {
  args: {
    children: <p>Page content goes here</p>
  }
};
