import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, fn } from '@storybook/test';
import { expect } from '@storybook/test';
import { NextRouter } from 'next/router';
import { EnquiryBar } from './index';

const meta: Meta<typeof EnquiryBar> = {
  component: EnquiryBar,
  args: {
    enquiryList: ['property-1', 'property-2'],
    router: { push: fn() } as unknown as NextRouter
  },
  parameters: {
    previewLayout: 'vertical'
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', backgroundColor: '#f9f9f9' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof EnquiryBar>;

export const Default: Story = {};

export const SingleProperty: Story = {
  args: {
    enquiryList: ['property-1']
  }
};

export const MultipleProperties: Story = {
  args: {
    enquiryList: ['property-1', 'property-2', 'property-3']
  }
};

export const NoProperties: Story = {
  args: {
    enquiryList: []
  }
};

export const Interactions: Story = {
  args: {
    enquiryList: ['property-1', 'property-2'],
    router: { push: fn() } as any
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /Enquire about selected properties/i
    });

    await step('The button is rendered correctly.', () => {
      expect(button).toBeInTheDocument();
    });

    await step(
      'Clicking the button triggers router.push with selected properties.',
      async () => {
        await userEvent.click(button);
        expect(args.router.push).toHaveBeenCalledWith(
          '/properties/enquiry?properties=property-1,property-2'
        );
      }
    );
  }
};
