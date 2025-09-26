import type { Meta, StoryObj } from '@storybook/react';

import { Masthead } from './index';

import { navItems, twoLevelsDeep, threeLevelsDeep } from './mocks/nav-items';

const meta: Meta<typeof Masthead> = {
  component: Masthead,
  args: {
    navigation: navItems,
    tel: '0208 123 4567'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Masthead>;

export const Default: Story = {};

export const TwoLevelsDeep: Story = {
  args: {
    navigation: twoLevelsDeep
  }
};

export const ThreeLevelsDeep: Story = {
  args: {
    navigation: threeLevelsDeep
  }
};
