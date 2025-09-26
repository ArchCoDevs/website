import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, waitFor } from '@storybook/test';
import { ContactCard } from './index';

const meta: Meta<typeof ContactCard> = {
  component: ContactCard,
  args: {
    tel: '0800 123 4567',
    email: 'email@example.com',
    address: '123 Fake Street, London, SW1A 1AA',
    registrationNo: '12345678'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ContactCard>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify that the contact card is rendered
    await waitFor(() =>
      expect(canvas.getByTestId('contact-card')).toBeInTheDocument()
    );

    // Check if the address is displayed correctly
    await waitFor(() =>
      expect(
        canvas.getByText('123 Fake Street, London, SW1A 1AA')
      ).toBeInTheDocument()
    );

    // Check if the telephone link is correct
    const telLink = canvas.getByRole('link', { name: '0800 123 4567' });
    await waitFor(() =>
      expect(telLink).toHaveAttribute('href', 'tel:0800 123 4567')
    );

    // Check if the email link is correct
    const emailLink = canvas.getByRole('link', { name: 'Email us' });
    await waitFor(() =>
      expect(emailLink).toHaveAttribute('href', 'mailto:email@example.com')
    );

    // Check if the Google Maps link is correct
    const googleMapsLink = canvas.getByRole('link', { name: 'Google Maps' });
    await waitFor(() =>
      expect(googleMapsLink).toHaveAttribute(
        'href',
        'https://www.google.co.uk/maps/place/33+Cannon+St,+London+EC4M+5SB/@51.5127503,-0.0949291,17z/data=!3m1!4b1!4m6!3m5!1s0x487604aa89208e6f:0x9ed7648de54f9230!8m2!3d51.5127503!4d-0.0949291!16s%2Fg%2F11c2h0ddcr?entry=ttu'
      )
    );

    // Check if the TFL link is correct
    const tflLink = canvas.getByRole('link', { name: /Plan a journey/i });
    await waitFor(() =>
      expect(tflLink).toHaveAttribute(
        'href',
        'https://tfl.gov.uk/plan-a-journey/?&To=Watling%20House%2C%2033%20Cannon%20Street%2C%20London%2C%20EC4M%205SBN'
      )
    );
  }
};
