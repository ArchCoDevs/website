/**
 * This file contains the configuration for the front-end application.
 *
 * NOTE: You may need to restart the application for changes to take effect.
 */

export const appConfig = {
  /**
   * The name of the application (in sentence case)
   * @required
   */
  appName: 'The Arch Company',
  /**
   * The site URL (used in the <link> tag).
   */
  siteUrl: 'https://www.thearchco.com',
  /**
   * The description of the application (used in the <meta> tag).
   * @required
   */
  appDescription:
    'If you want business space in some of the UK’s prime City centre locations; but with affordable rents, then we might just have the property.',
  businessRegistrationNumber: '11516452',
  /**
   * The links to display in the application's masthead.
   * If no links are provided, the navigation bar will not be displayed.
   * @optional
   */
  navLinks: [
    {
      id: 'findYourSpace',
      label: 'Find your space',
      href: '/find-your-space'
    },
    {
      id: 'featuredLocations',
      label: 'Featured locations',
      href: '/featured-locations'
    },
    {
      id: 'whyUs',
      label: 'Why us',
      href: '/why-us'
    },
    {
      id: 'existingCustomers',
      label: 'Existing customers',
      href: '/support-for-existing-customers'
    },
    {
      id: 'aboutUs',
      label: 'About us',
      href: '/about-us'
    }
  ],

  /**
   * The contact details for the application.
   */
  contactDetails: {
    tel: '0800 830 840',
    email: 'info@thearchco.com',
    address: {
      street: 'Watling House, 33 Cannon Street',
      city: 'London',
      postcode: 'EC4M 5SB'
    },
    pressOffice: {
      email: 'pressoffice@thearchco.com',
      tel: '0800 830 840'
    }
  },
  /**
   * The current VAT rate presented as a decimal.
   */
  currentVatRate: 0.2,
  /**
   * The tags to be used for invalidation of cached data.
   * @optional
   */
  storeTags: ['TestData'],

  /**
   * Some across-the-board timings for pages to be revalidated
   */
  defaultRevalidationSeconds: {
    contentOnly: 86400, // Any page that's just CMS content: 1 day
    propertyDetails: 10800 // Any page that has property details in: 3 hours
  }
};

export type AppConfig = {
  appName: string;
  appDescription: string;
  appLinks?: Array<{ label: string; href: string }>;
};

export default appConfig;
