import type { Meta, StoryObj } from '@storybook/react';
import { fn, within, userEvent, waitFor, expect } from '@storybook/test';
import { PropertyEnquiry } from './index';

const meta: Meta<typeof PropertyEnquiry> = {
  component: PropertyEnquiry,
  args: {
    name: 'PropertyEnquiry',
    id: 'PropertyEnquiry',
    propertyRef: '1234',
    tel: '0208 123 4567',
    onSubmit: fn()
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
    previewLayout: 'vertical'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PropertyEnquiry>;

export const Default: Story = {};

export const CustomHeading: Story = {
  args: {
    heading: 'Want to know more about this property?'
  }
};

export const FilledForm: Story = {
  args: {
    propertyRef: '5678'
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('User fills in the form', async () => {
      const firstNameInput = canvas.getByPlaceholderText('First name*');
      const lastNameInput = canvas.getByPlaceholderText('Last name*');
      const telephoneInput = canvas.getByPlaceholderText('Telephone*');
      const companyNameInput = canvas.getByPlaceholderText('Company name*');
      const emailInput = canvas.getByPlaceholderText('Email*');
      const timescaleInput = canvas.getByTestId('timescale');

      await userEvent.type(firstNameInput, 'Jane');
      await userEvent.type(lastNameInput, 'Smith');
      await userEvent.type(telephoneInput, '0987654321');
      await userEvent.type(companyNameInput, 'Jane Smith Inc');
      await userEvent.type(emailInput, 'jane.smith@example.com');
      await userEvent.selectOptions(timescaleInput, 'Immediately');
    });

    await step('User submits the form', async () => {
      const submitButton = canvas.getByRole('button', { name: /send/i });
      await userEvent.click(submitButton);

      await waitFor(() =>
        expect(args.onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            CompanyName: 'Jane Smith Inc',
            EmailAddress: 'jane.smith@example.com',
            FirstName: 'Jane',
            LastName: 'Smith',
            RentalSpaceReference: '5678',
            Phone: '0987654321',
            TimeScale: 'Immediately',
            EnquiryTopic: 'property'
          })
        )
      );
    });
  }
};

export const MissingInputsError: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('User submits the empty form', async () => {
      const submitButton = canvas.getByRole('button', { name: /send/i });
      await userEvent.click(submitButton);

      const firstNameInput = canvas.getByPlaceholderText('First name*');
      const lastNameInput = canvas.getByPlaceholderText('Last name*');
      const telephoneInput = canvas.getByPlaceholderText('Telephone*');
      const companyNameInput = canvas.getByPlaceholderText('Company name*');
      const emailInput = canvas.getByPlaceholderText('Email*');

      await waitFor(() => {
        expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
        expect(lastNameInput).toHaveAttribute('aria-invalid', 'true');
        expect(telephoneInput).toHaveAttribute('aria-invalid', 'true');
        expect(companyNameInput).toHaveAttribute('aria-invalid', 'true');
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      });

      await waitFor(() => {
        expect(canvas.getByText('First name is required')).toBeInTheDocument();
        expect(canvas.getByText('Last name is required')).toBeInTheDocument();
        expect(canvas.getByText('Telephone is required')).toBeInTheDocument();
        expect(
          canvas.getByText('Company name is required')
        ).toBeInTheDocument();
        expect(canvas.getByText('Email is required')).toBeInTheDocument();
      });
    });
  }
};

export const InvalidInputsError: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('User fills in the form with invalid data', async () => {
      const firstNameInput = canvas.getByPlaceholderText('First name*');
      const lastNameInput = canvas.getByPlaceholderText('Last name*');
      const telephoneInput = canvas.getByPlaceholderText('Telephone*');
      const companyNameInput = canvas.getByPlaceholderText('Company name*');
      const emailInput = canvas.getByPlaceholderText('Email*');

      await userEvent.type(firstNameInput, '123');
      await userEvent.type(lastNameInput, '456');
      await userEvent.type(telephoneInput, 'invalid-phone');
      await userEvent.type(companyNameInput, 'invalid@company');
      await userEvent.type(emailInput, 'invalid-email');
    });

    await step('User submits the form', async () => {
      const submitButton = canvas.getByRole('button', { name: /send/i });
      await userEvent.click(submitButton);

      const firstNameInput = canvas.getByPlaceholderText('First name*');
      const lastNameInput = canvas.getByPlaceholderText('Last name*');
      const telephoneInput = canvas.getByPlaceholderText('Telephone*');
      const companyNameInput = canvas.getByPlaceholderText('Company name*');
      const emailInput = canvas.getByPlaceholderText('Email*');

      await waitFor(() => {
        expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
        expect(lastNameInput).toHaveAttribute('aria-invalid', 'true');
        expect(telephoneInput).toHaveAttribute('aria-invalid', 'true');
        expect(companyNameInput).toHaveAttribute('aria-invalid', 'true');
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      });

      await waitFor(() => {
        expect(
          canvas.getByText('First name contains invalid characters')
        ).toBeInTheDocument();
        expect(
          canvas.getByText('Last name contains invalid characters')
        ).toBeInTheDocument();
        expect(
          canvas.getByText('Telephone must be a valid phone number')
        ).toBeInTheDocument();
        expect(
          canvas.getByText('Company name contains invalid characters')
        ).toBeInTheDocument();
        expect(
          canvas.getByText('Please enter a valid email address')
        ).toBeInTheDocument();
      });
    });
  }
};
