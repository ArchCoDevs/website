import type { Meta, StoryObj } from '@storybook/react';
import globalsData from 'lib/mocks/sanity/globals.json';

import { MyAccount } from './index.page';
import { handlers } from 'lib/mocks/handlers';
import { Globals } from 'lib/types/sanity.types';

const meta: Meta<typeof MyAccount> = {
  component: MyAccount,
  title: 'My Account Page',
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

type Story = StoryObj<typeof MyAccount>;

export const Default: Story = {};
