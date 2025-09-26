import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import Skeleton from './index';

import Avatar from 'components/data-display/avatar';
import Button from 'components/data-input/button';
import Card from 'components/layout/card';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  parameters: {
    previewLayout: 'vertical'
  },
  args: {
    isLoading: true,
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      </p>
    )
  },
  argTypes: {
    isInline: {
      control: {
        type: 'boolean'
      }
    },
    isCircle: {
      control: {
        type: 'boolean'
      }
    },
    isLoading: {
      control: {
        type: 'boolean'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const Circle: Story = {
  args: {
    isCircle: true,
    children: <Avatar name="John Doe" colour="rebeccapurple" />
  },
  decorators: [
    (Story) => (
      <div style={{ width: '8rem', height: '8rem' }}>
        <Story />
      </div>
    )
  ]
};

export const Inline: Story = {
  args: {
    isInline: true,
    children: <p>Smaller content</p>
  }
};

export const ToggleLoading: Story = {
  args: {
    isLoading: false
  },
  decorators: [
    (Story) => {
      const [args, updateArgs] = useArgs();
      return (
        <div>
          <Story />
          <Button
            onClick={() => updateArgs({ isLoading: !args.isLoading })}
            label={args.isLoading ? 'Stop loading' : 'Start loading'}
            style={{ marginTop: '1rem' }}
          />
        </div>
      );
    }
  ]
};

export const BadExample: Story = {
  render: (args) => {
    return (
      <Card>
        <Skeleton {...args}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '2rem'
            }}
          >
            <Avatar name="John Doe" colour="rebeccapurple" />
            <div style={{ marginLeft: '1rem' }}>
              <h2 style={{ fontWeight: 'bold', fontSize: '2rem' }}>John Doe</h2>
              <div style={{ marginTop: '1rem' }}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>
                  Pellentesque euismod, nisi vel consectetur euismod, nisl nisl
                  consectetur nisl, eget consectetur nisl nisl eget nisl.
                </p>
              </div>
            </div>
          </div>
        </Skeleton>
      </Card>
    );
  }
};

export const GoodExample: Story = {
  render: (args) => {
    return (
      <Card>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '2rem'
          }}
        >
          <Avatar
            name="John Doe"
            isLoading={args.isLoading}
            colour="rebeccapurple"
          />
          <div style={{ marginLeft: '1rem' }}>
            <Skeleton {...args} isInline>
              <h2 style={{ fontWeight: 'bold', fontSize: '2rem' }}>John Doe</h2>
            </Skeleton>
            <div style={{ marginTop: '1rem' }}>
              <Skeleton {...args}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Skeleton>
              <Skeleton {...args}>
                <p>
                  Pellentesque euismod, nisi vel consectetur euismod, nisl nisl
                  consectetur nisl, eget consectetur nisl nisl eget nisl.
                </p>
              </Skeleton>
            </div>
          </div>
        </div>
      </Card>
    );
  }
};
