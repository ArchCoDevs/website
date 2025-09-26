import type { Meta, StoryObj } from '@storybook/react';
import { PageTwoColumnEditorial } from './index';
import { handlers } from 'lib/mocks/handlers';
import pageData from 'lib/mocks/sanity/existing-customers.json';
import { TwoColumnEditorial } from 'lib/types/sanity.types';
const meta: Meta<typeof PageTwoColumnEditorial> = {
  component: PageTwoColumnEditorial as React.FC,
  parameters: {
    overflow: 'hide-both',
    previewLayout: 'vertical',
    msw: {
      handlers: handlers
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PageTwoColumnEditorial>;

export const Default: Story = {
  args: {
    data: pageData[1] as TwoColumnEditorial,
    breadcrumbs: [
      {
        label: 'Support for existing customers',
        href: `/support-for-existing-customers`
      },
      {
        label: 'fsb membership',
        href: `/support-for-existing-customers/fsb-membership`
      }
    ]
  }
};
