import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, fn } from '@storybook/test';
import { WithMap } from '@doc-blocks/with-map';

// Import components
import { Map } from './index';

// Import mock data
import properties from 'lib/mocks/keystone/search-results.json';

const meta: Meta<typeof Map> = {
  component: Map,
  args: {
    properties: properties.rental_space_model_list,
    onSelectionChange: fn(),
    onMapUpdate: fn()
  },
  decorators: [
    (Story) => {
      return (
        <WithMap>
          <div style={{ height: '600px', width: '100%' }}>
            <Story />
          </div>
        </WithMap>
      );
    }
  ]
};

export default meta;

type Story = StoryObj<typeof Map>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const map = await within(canvasElement).getByTestId('map');
    step('Map is displayed', () => {
      expect(map).toBeInTheDocument();
    });
    // TODO: Due to time constraints, the following steps are not implemented:
    // - Moving the map calls the onMapUpdate function
    // - Clicking a pin calls the onSelectionChange function
    // It would be great to implement these steps in the future, when time allows.
  }
};

/**
 * The 'Static' story is used to display the map in a static state.
 */
export const Static: Story = {
  args: {
    isStatic: true
  }
};
