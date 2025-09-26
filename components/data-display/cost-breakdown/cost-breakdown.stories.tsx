import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor, expect } from '@storybook/test';
import { CostBreakdown } from './index';

const meta: Meta<typeof CostBreakdown> = {
  component: CostBreakdown,
  tags: ['autodocs'],
  args: {
    pricePerMonth: 3333,
    businessRates: 1000,
    serviceCharge: 2000,
    insurance: 500,
    vatRate: 0.2
  }
};

export default meta;

type Story = StoryObj<typeof CostBreakdown>;

export const Default: Story = {};

export const MonthlyNoVAT: Story = {
  args: {
    showMonthly: true
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the table is in monthly view', async () => {
      const rent = canvas.getByText('£3,333');
      const businessRates = canvas.getByText('£1,000');
      const serviceCharge = canvas.getByText('£2,000');
      const insurance = canvas.getByText('£500');
      const totalCost = canvas.getByText('£6,833');

      expect(rent).toBeInTheDocument();
      expect(businessRates).toBeInTheDocument();
      expect(serviceCharge).toBeInTheDocument();
      expect(insurance).toBeInTheDocument();
      expect(totalCost).toBeInTheDocument();
    });
  }
};

export const AnnuallyNoVAT: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the table is in annual view', async () => {
      const rent = canvas.getByText('£39,996');
      const businessRates = canvas.getByText('£12,000');
      const serviceCharge = canvas.getByText('£24,000');
      const insurance = canvas.getByText('£6,000');
      const totalCost = canvas.getByText('£81,996');

      expect(rent).toBeInTheDocument();
      expect(businessRates).toBeInTheDocument();
      expect(serviceCharge).toBeInTheDocument();
      expect(insurance).toBeInTheDocument();
      expect(totalCost).toBeInTheDocument();
    });

    await step('Toggle to monthly breakdown and verify', async () => {
      const button = canvas.getByRole('button', { name: /view monthly/i });
      await userEvent.click(button);

      await waitFor(() => {
        const rent = canvas.getByText('£3,333');
        const businessRates = canvas.getByText('£1,000');
        const serviceCharge = canvas.getByText('£2,000');
        const insurance = canvas.getByText('£500');
        const totalCost = canvas.getByText('£6,833');

        expect(rent).toBeInTheDocument();
        expect(businessRates).toBeInTheDocument();
        expect(serviceCharge).toBeInTheDocument();
        expect(insurance).toBeInTheDocument();
        expect(totalCost).toBeInTheDocument();
      });
    });
  }
};

export const MonthlyWithVAT: Story = {
  args: {
    showMonthly: true,
    withVat: true
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the table is in monthly view with VAT', async () => {
      await waitFor(() => {
        const rent = canvas.getByText('£3,999.60');
        const businessRates = canvas.getByText('£1,000');
        const serviceCharge = canvas.getByText('£2,400');
        const insurance = canvas.getByText('£600');
        const totalCost = canvas.getByText('£7,999.60');

        expect(rent).toBeInTheDocument();
        expect(businessRates).toBeInTheDocument();
        expect(serviceCharge).toBeInTheDocument();
        expect(insurance).toBeInTheDocument();
        expect(totalCost).toBeInTheDocument();
      });
    });
  }
};

export const AnnuallyWithVAT: Story = {
  args: {
    withVat: true,
    showMonthly: false
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check that the table is in annual view with VAT', async () => {
      await waitFor(() => {
        const rent = canvas.getByText('£47,995.20');
        const businessRates = canvas.getByText('£12,000');
        const serviceCharge = canvas.getByText('£28,800');
        const insurance = canvas.getByText('£7,200');
        const totalCost = canvas.getByText('£95,995.20');

        expect(rent).toBeInTheDocument();
        expect(businessRates).toBeInTheDocument();
        expect(serviceCharge).toBeInTheDocument();
        expect(insurance).toBeInTheDocument();
        expect(totalCost).toBeInTheDocument();
      });
    });

    await step('Toggle to monthly breakdown and verify', async () => {
      const button = canvas.getByRole('button', { name: /view monthly/i });
      await userEvent.click(button);

      await waitFor(() => {
        const rent = canvas.getByText('£3,999.60');
        const businessRates = canvas.getByText('£1,000');
        const serviceCharge = canvas.getByText('£2,400');
        const insurance = canvas.getByText('£600');
        const totalCost = canvas.getByText('£7,999.60');

        expect(rent).toBeInTheDocument();
        expect(businessRates).toBeInTheDocument();
        expect(serviceCharge).toBeInTheDocument();
        expect(insurance).toBeInTheDocument();
        expect(totalCost).toBeInTheDocument();
      });
    });
  }
};

export const NoRentRow: Story = {
  args: {
    pricePerMonth: undefined
  }
};

export const NoRatesRow: Story = {
  args: {
    businessRates: undefined
  }
};

export const NoServiceRow: Story = {
  args: {
    serviceCharge: undefined
  }
};

export const NoInsuranceRow: Story = {
  args: {
    insurance: undefined
  }
};

export const ChargeIsServiceFee: Story = {
  args: {
    isServiceFee: true
  }
};
