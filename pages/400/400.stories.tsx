import type { Meta, StoryObj } from '@storybook/react';
import globalsData from 'lib/mocks/sanity/globals.json';
import ErrorData from 'lib/mocks/sanity/errors.json';
import { Error400 } from './index.page';
import { handlers } from 'lib/mocks/handlers';
import { Globals, Errors } from 'lib/types/sanity.types';

const meta: Meta<typeof Error400> = {
  component: Error400,
  title: '400',
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
    globals: globalsData as unknown as Globals,
    errors: ErrorData[0] as unknown as Errors
  }
};

export default meta;

type Story = StoryObj<typeof Error400>;

export const Default: Story = {};
