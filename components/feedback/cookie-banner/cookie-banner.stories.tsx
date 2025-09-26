import type { Meta, StoryObj } from '@storybook/react';

import { CookieBanner } from './index';

const meta: Meta<typeof CookieBanner> = {
  component: CookieBanner,
  parameters: {
    previewLayout: 'vertical'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof CookieBanner>;

export const Default: Story = {};
