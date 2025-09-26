import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { AdvancedSearch } from './index';

// Import mock data

import propertyUseTypes from 'lib/mocks/property-use-types';
import propertyKeyFeatures from 'lib/mocks/property-key-features';

const meta: Meta<typeof AdvancedSearch> = {
  component: AdvancedSearch,
  args: {
    name: 'AdvancedSearch',
    onSearch: fn(),
    onReset: fn()
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: '1280px'
        }}
      >
        <Story />
      </div>
    )
  ],
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof AdvancedSearch>;

export const Default: Story = {
  render: (args) => (
    <AdvancedSearch
      name="AdvancedSearch"
      propertyUseTypes={propertyUseTypes}
      keyFeatures={propertyKeyFeatures}
      onSearch={args.onSearch}
      onReset={args.onReset}
    />
  )
  // play: async ({ args, canvasElement, step }) => {
  //   const { getByRole, getByLabelText, getByText, getByTestId } =
  //     within(canvasElement);

  //   const today = new Date();
  //   const sevenDaysAgo = subDays(today, 7).toISOString();
  //   const cleanDate = sevenDaysAgo.split('T')[0];

  //   await step('User types "Oxford" into the input', async () => {
  //     const input = getByRole('textbox', { name: /area/i });
  //     await userEvent.type(input, 'Oxford');
  //     await userEvent.keyboard('{enter}');
  //     await waitFor(() => expect(input).toHaveValue('Oxford'));
  //   });

  //   await step(
  //     'User selects "+ 10 miles" from the distance dropdown',
  //     async () => {
  //       const select = getByRole('combobox', { name: /distance/i });
  //       await userEvent.selectOptions(select, '+ 10 miles');
  //       await waitFor(() => expect(select).toHaveValue('10'));
  //     }
  //   );

  //   await step('User expands the filter section', async () => {
  //     const filterToggle = getByTestId('filter-toggle');
  //     await userEvent.click(filterToggle);
  //     await waitFor(() => expect(getByText(/property type/i)).toBeVisible());
  //   });

  //   await step('User selects "Storage" property type', async () => {
  //     const checkbox = getByLabelText('Storage');
  //     await userEvent.click(checkbox);
  //     await waitFor(() => expect(checkbox).toBeChecked());
  //   });

  //   await step('User selects "24/7 access" key feature', async () => {
  //     const checkbox = getByLabelText('24/7 access');
  //     await userEvent.click(checkbox);
  //     await waitFor(() => expect(checkbox).toBeChecked());
  //   });

  //   await step('User selects "Min size" and "Max size"', async () => {
  //     const minSize = getByRole('combobox', { name: /min size/i });
  //     const maxSize = getByRole('combobox', { name: /max size/i });
  //     await userEvent.selectOptions(minSize, '500');
  //     await userEvent.selectOptions(maxSize, '5000');
  //     await waitFor(() => expect(minSize).toHaveValue('500'));
  //     await waitFor(() => expect(maxSize).toHaveValue('5000'));
  //   });

  //   await step('User selects "Min rent" and "Max rent"', async () => {
  //     const minRent = getByRole('combobox', { name: /min rent/i });
  //     const maxRent = getByRole('combobox', { name: /max rent/i });
  //     await userEvent.selectOptions(minRent, '10000');
  //     await userEvent.selectOptions(maxRent, '80000');
  //     await waitFor(() => expect(minRent).toHaveValue('10000'));
  //     await waitFor(() => expect(maxRent).toHaveValue('80000'));
  //   });

  //   await step('User selects "Added to site" option', async () => {
  //     const addedToSite = getByRole('combobox', { name: /added to site/i });
  //     await userEvent.selectOptions(addedToSite, 'Last 7 days');
  //     await waitFor(() => {
  //       // @ts-ignore - Value exists
  //       const selectedValue = addedToSite.value.split('T')[0];
  //       expect(selectedValue).toBe(cleanDate);
  //     });
  //   });

  //   await step('User clicks the search button', async () => {
  //     const button = getByRole('button', { name: /search/i });
  //     await userEvent.click(button);

  //     await waitFor(() =>
  //       expect(args.onSearch).toHaveBeenCalledWith({
  //         area: 'Oxford',
  //         distance: '10',
  //         'property-type': ['Storage'],
  //         'key-features': ['24/7 access'],
  //         'min-size': '500',
  //         'max-size': '5000',
  //         'min-rent': '10000',
  //         'max-rent': '80000',
  //         'added-to-site': expect.stringMatching(new RegExp(`^${cleanDate}`))
  //       })
  //     );
  //   });
  // }
};

export const OpenByDefault: Story = {
  render: (args) => (
    <AdvancedSearch
      name="AdvancedSearch"
      propertyUseTypes={propertyUseTypes}
      keyFeatures={propertyKeyFeatures}
      onSearch={args.onSearch}
      onReset={args.onReset}
      showAdvancedSearch
    />
  )
};
