import type { Meta, StoryObj } from '@storybook/react';

// Import components
import { TableCaption } from './index';

const meta: Meta<typeof TableCaption> = {
  component: TableCaption,
  args: {
    content: 'Table Caption goes here'
  },
  // parameters: {
  //   worksWith: 'TableFactory'
  // },
  decorators: [
    (Story) => (
      <table style={{ width: '100%' }}>
        {Story()}
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>`
          </tr>
        </tbody>
      </table>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof TableCaption>;

export const Default: Story = {};
