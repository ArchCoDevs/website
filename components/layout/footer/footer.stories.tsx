import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';

// Import component files
import { Footer } from './index';

// Mock data

const links = [
  { href: '/p/cookies', label: 'Cookies' },
  { href: '/p/careers', label: 'Careers' },
  { href: '/p/press-media', label: 'Press/media' },
  { href: '/p/modern-slavery', label: 'Modern slavery' },
  { href: '/p/privacy-policy', label: 'Privacy policy' },
  { href: '/p/terms-and-conditions', label: 'Terms & conditions' }
];

const socials = [
  {
    href: 'https://www.instagram.com/thearchcolondon',
    label: 'Instagram',
    icon: 'instagram',
    target: '_blank'
  },
  {
    href: 'https://twitter.com/thearchcolondon',
    label: 'Twitter',
    icon: 'twitter',
    target: '_blank'
  },
  {
    href: 'https://www.linkedin.com/company/thearchcolondon',
    label: 'LinkedIn',
    icon: 'linkedin',
    target: '_blank'
  },
  {
    href: 'https://www.facebook.com/thearchcolondon',
    label: 'Facebook',
    icon: 'facebook',
    target: '_blank'
  }
];

const meta: Meta<typeof Footer> = {
  component: Footer,
  args: {
    links,
    socials
  },
  tags: ['autodocs'],
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // Test the footer logo
    await step('Check footer logo', async () => {
      const logo = canvas.getByTestId('logo');
      await expect(logo).toBeInTheDocument();
    });

    // Test the footer links
    for (const link of links) {
      await step(`Check footer link: ${link.label}`, async () => {
        const footerLink = canvas.getByRole('link', { name: link.label });
        await expect(footerLink).toBeInTheDocument();
      });
    }

    // Test the footer socials
    for (const social of socials) {
      await step(`Check footer social: ${social.label}`, async () => {
        const footerSocial = canvas.getByRole('link', { name: social.label });
        await expect(footerSocial).toBeInTheDocument();
      });
    }
  }
};
