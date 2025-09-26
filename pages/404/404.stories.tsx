import type { Meta, StoryObj } from '@storybook/react';
import globalsData from 'lib/mocks/sanity/globals.json';
import ErrorData from 'lib/mocks/sanity/errors.json';
import { Error404 } from './index.page';
import { handlers } from 'lib/mocks/handlers';
import { Globals, Errors } from 'lib/types/sanity.types';

const meta: Meta<typeof Error404> = {
  component: Error404,
  title: '404',
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

type Story = StoryObj<typeof Error404>;

export const Default: Story = {};
