import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/test';
import { expect } from '@storybook/test';

// Import component files
import SanityTableFactory from './index';

const tableData = {
  description:
    'This is a test table description to illustrate how a table caption can be applied to the content.',
  firstRowHeader: true,
  infoTable: {
    rows: [
      {
        _key: '536c98dd-d7f4-4375-b5da-dbc9c97573e6',
        _type: 'tableRow',
        cells: ['Name', 'Quantity', 'Dispatched']
      },
      {
        _key: '573abf24-7914-47f7-83b3-4420515df0b3',
        _type: 'tableRow',
        cells: ['Staples', '19999', 'true']
      },
      {
        _key: '47c7cb61-2b91-45ae-a0b2-7e5528e12468',
        _type: 'tableRow',
        cells: ['Harry potter wands', '3', 'true']
      },
      {
        _key: '613b6d10-f074-4e5c-976e-85c3a1352a7c',
        _type: 'tableRow',
        cells: ['The one ring', '1', 'false']
      },
      {
        _key: '02b163e1-cb79-462a-a9b4-c62bd59a1444',
        _type: 'tableRow',
        cells: ['Rubber ducks', '10000000000000', 'true']
      }
    ]
  },
  title: 'Test Title'
};

// The same data but with no header row (sorting and filtering disabled)
const tableDataWithoutHeader = {
  ...tableData,
  firstRowHeader: false,
  // Remove the header row so all rows are data rows
  rows: tableData.infoTable.rows.slice(1)
};

const meta: Meta<typeof SanityTableFactory> = {
  component: SanityTableFactory,
  parameters: {
    previewLayout: 'vertical',
    actions: {
      handles: ['click']
    }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    )
  ],
  args: {
    data: tableData
  },
  argTypes: {
    striped: {
      control: { type: 'boolean' }
    },
    solidHeader: {
      control: { type: 'boolean' }
    },
    hideHeader: {
      control: { type: 'boolean' }
    },
    titleCaseHeaders: {
      control: { type: 'boolean' }
    },
    filtering: {
      control: { type: 'check' },
      options: Array.from(
        { length: tableData.infoTable.rows.length },
        (_v, i) => i + 1
      )
    },
    onClick: { action: true }
  }
};

export default meta;

type Story = StoryObj<typeof SanityTableFactory>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const table = await within(canvasElement).findByRole('table');
    const headers = await within(table).findAllByRole('columnheader');
    // Query rows from the tbody
    const rows = table.querySelectorAll('tbody tr');

    await step('Headers are rendered correctly', () => {
      expect(headers.length).toBe(3);
      expect(headers[0]).toHaveTextContent('Name');
      expect(headers[1]).toHaveTextContent('Quantity');
      expect(headers[2]).toHaveTextContent('Dispatched');
    });

    await step('Rows are rendered correctly', () => {
      // With header row, body contains 4 rows (data rows only)
      expect(rows.length).toBe(4);
    });

    await step('First row is rendered correctly', () => {
      expect(rows[0]).toHaveTextContent('Staples');
      expect(rows[0]).toHaveTextContent('19999');
      // "true" is converted to ✅
      expect(rows[0]).toHaveTextContent('✅');
    });
  }
};

export const WithoutHeaderRow: Story = {
  args: {
    data: tableDataWithoutHeader
  },
  play: async ({ canvasElement, step }) => {
    const table = await within(canvasElement).findByRole('table');
    const rows = table.querySelectorAll('tbody tr');

    await step('Rows are rendered correctly without headers', () => {
      // When there's no header, all rows are data rows
      expect(rows.length).toBe(5);
    });

    await step('First row is rendered correctly', () => {
      // Now the first row is the Staples row
      expect(rows[1]).toHaveTextContent('Staples');
      expect(rows[1]).toHaveTextContent('19999');
      expect(rows[1]).toHaveTextContent('✅');
    });
  }
};

export const WithCaption: Story = {
  args: {
    data: tableData
  },
  play: async ({ canvasElement, step }) => {
    const caption = await within(canvasElement).findByText(
      'This is a test table description to illustrate how a table caption can be applied to the content.'
    );

    await step('Caption is rendered correctly', () => {
      expect(caption).toBeInTheDocument();
    });
  }
};

export const Sortable: Story = {
  args: {
    sorting: ['*']
  },
  play: async ({ canvasElement, step }) => {
    const table = await within(canvasElement).findByRole('table');
    const sortButtons = await within(table).findAllByRole('button');

    await step('Initial sorting is applied to first column', async () => {
      const rows = table.querySelectorAll('tbody tr');
      // Sorting by "Name" (first column) alphabetically
      expect(rows[0]).toHaveTextContent('Harry potter wands');
      expect(rows[1]).toHaveTextContent('Rubber ducks');
      expect(rows[2]).toHaveTextContent('Staples');
    });

    await step(
      'Clicking the quantity sort button sorts by quantity',
      async () => {
        // Click the "Quantity" header button (index 1)
        await userEvent.click(sortButtons[0]);
        await waitFor(() => {
          const rows = table.querySelectorAll('tbody tr');
          // Sorting by quantity (numeric)
          expect(rows[0]).toHaveTextContent('Rubber ducks');
          expect(rows[1]).toHaveTextContent('Staples');
          expect(rows[2]).toHaveTextContent('Harry potter wands');
        });
      }
    );
  }
};

export const Filterable: Story = {
  args: {
    filtering: ['*']
  },
  play: async ({ canvasElement, step }) => {
    const table = await within(canvasElement).findByRole('table');
    const filterInputs = await within(table).findAllByRole('textbox');

    await step('Filtering by item name works correctly', async () => {
      await userEvent.type(filterInputs[0], 'Staples');
      await waitFor(() => {
        const rows = table.querySelectorAll('tbody tr');
        expect(rows.length).toBe(2); // 1 content row + 1 row for the filter itself
        expect(rows[1]).toHaveTextContent('Staples');
      });
      await userEvent.clear(filterInputs[0]);
    });
  }
};
