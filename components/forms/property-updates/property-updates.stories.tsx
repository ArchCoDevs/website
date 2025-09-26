import type { Meta, StoryObj } from '@storybook/react';
import { fn, within, userEvent, waitFor, expect } from '@storybook/test';
import { PropertyUpdates } from './index';

const meta: Meta<typeof PropertyUpdates> = {
  component: PropertyUpdates,
  args: {
    name: 'PropertyUpdates',
    id: 'PropertyUpdates',
    onSubmit: fn()
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
    previewLayout: 'vertical'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PropertyUpdates>;

export const Default: Story = {};

export const FilledForm: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Sign up' });
    await userEvent.type(canvas.getByPlaceholderText('First name*'), 'John');
    await userEvent.type(canvas.getByPlaceholderText('Last name*'), 'Doe');
    await userEvent.type(
      canvas.getByPlaceholderText('Telephone*'),
      '123456789'
    );
    await userEvent.type(
      canvas.getByPlaceholderText('Email*'),
      'john.doe@example.com'
    );
    await userEvent.selectOptions(canvas.getByLabelText('Size*'), [
      '1000-2000'
    ]);
    await userEvent.selectOptions(canvas.getByLabelText('Rent*'), [
      '5000-10000'
    ]);
    await userEvent.selectOptions(canvas.getByLabelText('Nearest station*'), [
      'ABW'
    ]);
    await userEvent.click(canvas.getByLabelText('Office'));
    await userEvent.click(button);
    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
  }
};
