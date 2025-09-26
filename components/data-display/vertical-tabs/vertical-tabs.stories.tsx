import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import { VerticalTabs } from './index';
import { tabs } from './mocks/tabs';
import styles from './styles.module.scss';

const meta: Meta<typeof VerticalTabs> = {
  component: VerticalTabs,
  parameters: {
    previewLayout: 'vertical'
  },
  args: {
    tabs: tabs,
    initialTab: 'picard'
  },
  argTypes: {
    initialTab: {
      control: 'text',
      description: 'Initial tab to be selected'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof VerticalTabs>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const container = within(canvasElement).getByTestId(
      'vertical-tabs-container'
    );

    await step('The tabs are rendered', async () => {
      // Expect the container to be rendered
      expect(container).toBeTruthy();
    });

    await step('All tabs are rendered', async () => {
      // Expect the correct number of tabs
      const tabs = within(container).getAllByRole('listitem');
      expect(tabs.length).toBe(4);
    });

    await step('The initial tab is active', async () => {
      // Expect the initial tab to be active
      const activeTab = within(container).getByRole('link', {
        name: 'Jean-Luc Picard'
      });
      expect(activeTab.closest('li')).toHaveClass(styles['active']);
    });

    await step('The content for the initial tab is rendered', async () => {
      // Expect the content for the initial tab to be visible
      const activeContent = within(container).getByTestId('content');
      const activeContentText = within(activeContent).getByText(
        "Picard's leadership style is characterized by his diplomatic approach and steady hand, often resolving conflicts with wisdom and negotiation rather than force."
      );
      expect(activeContentText).toBeInTheDocument();
    });
  }
};

export const WithInitialTab: Story = {
  args: {
    initialTab: 'janeway'
  },
  play: async ({ canvasElement, step }) => {
    const container = within(canvasElement).getByTestId(
      'vertical-tabs-container'
    );

    await step('The initial tab is active', async () => {
      // Expect the initial tab to be active
      const activeTab = within(container).getByRole('link', {
        name: 'Kathryn Janeway'
      });
      expect(activeTab.closest('li')).toHaveClass(styles['active']);
    });

    await step('All tabs are rendered', async () => {
      // Expect the correct number of tabs
      const tabs = within(container).getAllByRole('listitem');
      expect(tabs.length).toBe(4);
    });

    await step('The content for the initial tab is rendered', async () => {
      // Expect the content for the initial tab to be visible
      const activeContent = within(container).getByTestId('content');
      const activeContentText = within(activeContent).getByText(
        "Janeway's command decisions are often driven by her strong ethical compass and a deep sense of responsibility toward her crew."
      );
      expect(activeContentText).toBeInTheDocument();
    });
  }
};
