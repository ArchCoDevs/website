import type { Meta, StoryObj } from '@storybook/react';
import { handlers } from 'lib/mocks/handlers';
import pageData from 'lib/mocks/sanity/landing-page.json';
import { LandingPage } from 'lib/types/sanity.types';
import PageLandingPage from './index.page';
const meta: Meta<typeof PageLandingPage> = {
  component: PageLandingPage as React.FC,
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

type Story = StoryObj<typeof PageLandingPage>;

export const Default: Story = {
  args: {
    data: pageData[0] as LandingPage,
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
