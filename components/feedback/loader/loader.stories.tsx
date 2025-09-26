import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/test';
import { expect } from '@storybook/test';
import { useArgs } from '@storybook/preview-api';

import { Loader, allowedColours, allowedTypes } from './index';
import Button from 'components/data-input/button';

const meta: Meta<typeof Loader> = {
  component: Loader,
  argTypes: {
    type: {
      options: allowedTypes,
      control: {
        type: 'select'
      }
    },
    variant: {
      options: allowedColours,
      control: {
        type: 'select'
      }
    },
    label: {
      control: {
        type: 'text'
      }
    },
    size: {
      control: {
        type: 'range',
        min: 0,
        max: 200,
        step: 1
      }
    },
    progress: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {};

export const SetWidth: Story = {
  args: {
    size: 100
  }
};

export const Spinner: Story = {
  args: {
    type: 'spinner'
  }
};

export const Bar: Story = {
  args: {
    type: 'bar'
  },
  parameters: {
    previewLayout: 'vertical'
  }
};

export const Dots: Story = {
  args: {
    type: 'dots'
  }
};

export const BarWithLabel: Story = {
  args: {
    type: 'bar',
    label: 'Loading...'
  },
  parameters: {
    previewLayout: 'vertical'
  }
};

export const PercentageBar: Story = {
  args: {
    type: 'percentage-bar',
    progress: 0
  },
  parameters: {
    previewLayout: 'vertical'
  },
  decorators: [
    (Story) => {
      const [_, updateArgs] = useArgs();
      return (
        <>
          <Story />
          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              gap: '10px',
              justifyContent: 'center'
            }}
          >
            <h2>Set progress: </h2>
            <Button
              data-testid="percent-0"
              onClick={() => updateArgs({ progress: 0 })}
              label="0%"
            />
            <Button
              data-testid="percent-25"
              onClick={() => {
                updateArgs({ progress: 25 });
              }}
              label="25%"
            />
            <Button
              data-testid="percent-50"
              onClick={() => {
                updateArgs({ progress: 50 });
              }}
              label="50%"
            />
            <Button
              data-testid="percent-75"
              onClick={() => {
                updateArgs({ progress: 75 });
              }}
              label="75%"
            />
            <Button
              data-testid="percent-100"
              onClick={() => {
                updateArgs({ progress: 100 });
              }}
              label="100%"
            />
          </div>
        </>
      );
    }
  ],
  play: async ({ canvasElement, step }) => {
    const loader = within(canvasElement).getByRole('progressbar');
    await step('The loader is rendered', async () => {
      expect(loader).toBeInTheDocument();
    });

    await step('The loader progress is set to 50%', async () => {
      const button = within(canvasElement).getByTestId('percent-50');
      await userEvent.click(button);
      await waitFor(() =>
        expect(loader).toHaveAttribute('aria-valuenow', '50')
      );
    });

    await step('The loader progress is set to 100%', async () => {
      const button = within(canvasElement).getByTestId('percent-100');
      await userEvent.click(button);
      await waitFor(() =>
        expect(loader).toHaveAttribute('aria-valuenow', '100')
      );
    });

    await step('The loader progress is set to 0%', async () => {
      const button = within(canvasElement).getByTestId('percent-0');
      await userEvent.click(button);
      await waitFor(() => expect(loader).toHaveAttribute('aria-valuenow', '0'));
    });
  }
};
