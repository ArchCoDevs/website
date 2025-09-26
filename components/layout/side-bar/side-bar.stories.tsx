import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { within, userEvent, waitFor, expect } from '@storybook/test';
import { SideBar } from './index';

const FakeBlock = ({ item }: { item: string }) => (
  <div
    style={{
      display: 'flex',
      placeItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      backgroundColor: 'navy',
      width: '200px',
      height: '200px',
      marginBottom: '20px'
    }}
  >
    Item {item}
  </div>
);

const meta: Meta<typeof SideBar> = {
  component: SideBar,
  args: {
    children: (
      <>
        <FakeBlock item="1" />
        <FakeBlock item="2" />
        <FakeBlock item="3" />
        <FakeBlock item="4" />
        <FakeBlock item="5" />
      </>
    )
  },
  argTypes: {
    children: {
      table: {
        disable: true
      }
    },
    isOpen: {
      control: {
        type: 'boolean'
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '500px', width: '400px' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof SideBar>;

export const Default: Story = {
  args: {
    isOpen: true
  }
};

export const Closed: Story = {
  args: {
    isOpen: false
  }
};

export const Controllable: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) {
          setIsOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen]);

    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '10px',
            backgroundColor: 'darkred',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
        </button>
        <SideBar {...args} isOpen={isOpen}>
          {args.children}
        </SideBar>
      </div>
    );
  },
  args: {
    isOpen: false
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Simulate opening the sidebar
    await userEvent.click(
      canvas.getByRole('button', { name: /open sidebar/i })
    );

    await waitFor(() => {
      const sidebar = canvas.getByRole('complementary');
      expect(sidebar).toBeVisible();
    });

    // Simulate closing the sidebar by pressing the Escape key
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      const sidebar = canvas.getByRole('complementary');
      expect(sidebar).not.toBeVisible();
    });

    // Simulate opening the sidebar again
    await userEvent.click(
      canvas.getByRole('button', { name: /open sidebar/i })
    );
    await waitFor(() => {
      const sidebar = canvas.getByRole('complementary');
      expect(sidebar).toBeVisible();
    });
  }
};
