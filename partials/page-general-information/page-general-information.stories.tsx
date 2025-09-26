import type { Meta, StoryObj } from '@storybook/react';
import { PageGeneralInformation } from './index';
import { handlers } from 'lib/mocks/handlers';
import pageData from 'lib/mocks/sanity/existing-customers.json';
import { GeneralInformation } from 'lib/types/sanity.types';
const meta: Meta<typeof PageGeneralInformation> = {
  component: PageGeneralInformation as React.FC,
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

type Story = StoryObj<typeof PageGeneralInformation>;

export const Default: Story = {
  args: {
    data: pageData[0] as GeneralInformation,
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
