import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor, expect, fn } from '@storybook/test';
import { MiniSearch } from './index';

// Import mock data

const meta: Meta<typeof MiniSearch> = {
  component: MiniSearch,
  args: {
    name: 'MiniSearch',
    onSearch: fn()
  },
  parameters: {
    status: 'alpha'
  }
};

export default meta;

type Story = StoryObj<typeof MiniSearch>;

export const Default: Story = {
  render: (args) => <MiniSearch name="MiniSearch" onSearch={args.onSearch} />,
  play: async ({ args, canvasElement, step }) => {
    const { getByTestId, getByRole } = within(canvasElement);

    await step('User types "Oxford" into the input', async () => {
      const input = getByTestId('location');
      await userEvent.type(input, 'Oxford');
      await userEvent.keyboard('{enter}');
      await waitFor(() => expect(input).toHaveValue('Oxford'));
    });

    await step('User clicks the search button', async () => {
      const button = getByRole('button', { name: /search/i });
      await userEvent.click(button, { delay: 100 });

      await waitFor(() => {
        expect(args.onSearch).toHaveBeenCalledWith({
          area: 'Oxford',
          distance: '0'
        });
      });
    });
  }
};

export const Extended: Story = {
  args: {
    extended: true
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          placeContent: 'center',
          backgroundImage: 'url(/mocks/images/property-8.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem'
        }}
      >
        <Story />
      </div>
    )
  ],
  render: (args) => (
    <MiniSearch name="MiniSearch" onSearch={args.onSearch} extended />
  )
};
