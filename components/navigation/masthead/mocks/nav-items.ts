export const navItems = [
  {
    label: 'Find a space',
    href: '#'
  },
  {
    label: 'Find a location',
    href: '#'
  },
  {
    label: 'Why us',
    href: '#'
  },
  {
    label: 'Existing tenants',
    href: '#'
  }
];

export const twoLevelsDeep = [
  {
    label: 'Find a space',
    href: '#'
  },
  {
    label: 'Find a location',
    href: '#'
  },
  {
    label: 'Why us',
    href: '#',
    children: [
      {
        label: 'Our story',
        href: '#'
      },
      {
        label: 'Our team',
        href: '#'
      },
      {
        label: 'Our values',
        href: '#'
      }
    ]
  },
  {
    label: 'Existing tenants',
    href: '#'
  }
];

export const threeLevelsDeep = [
  {
    label: 'Find a space',
    href: '#find-a-space',
    children: [
      {
        label: 'Offices',
        href: '#offices',
        children: [
          {
            label: 'London',
            href: '#london'
          },
          {
            label: 'Manchester',
            href: '#manchester'
          },
          {
            label: 'Birmingham',
            href: '#birmingham'
          }
        ]
      },
      {
        label: 'Retail',
        href: '#retail'
      },
      {
        label: 'Industrial',
        href: '#industrial'
      }
    ]
  },
  {
    label: 'Featured locations',
    href: '#find-a-location',
    children: [
      {
        label: 'London',
        href: '#london',
        children: [
          {
            label: 'North',
            href: '#north'
          },
          {
            label: 'South',
            href: '#south'
          },
          {
            label: 'East',
            href: '#east'
          },
          {
            label: 'West',
            href: '#west'
          }
        ]
      },
      {
        label: 'Manchester',
        href: '#manchester'
      },
      {
        label: 'Birmingham',
        href: '#birmingham'
      }
    ]
  },
  {
    label: 'Why us',
    href: '#why-us',
    children: [
      {
        label: 'Our story',
        href: '#our-story'
      },
      {
        label: 'This is a very long label',
        href: '#long-label',
        children: [
          {
            label: 'Our CEO',
            href: '#ceo'
          },
          {
            label: 'Our CTO',
            href: '#cto'
          },
          {
            label: 'This is also a very long label',
            href: '#long-label-2'
          }
        ]
      },
      {
        label: 'Our values',
        href: '#our-values'
      }
    ]
  },
  {
    label: 'Support for existing customers',
    href: '#existing-tenants',
    children: [
      {
        label: 'Help and support',
        href: '#help-and-support'
      },
      {
        label: 'Contact us',
        href: '#contact-us'
      }
    ]
  }
];

export default navItems;
