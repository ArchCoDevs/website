export const navigationQuery = `*[_type == "navigation"][0]{
  findYourSpace[] {
    label,
    href,
    subnav[] {
      label,
      href
    }
  },
  featuredLocations[] {
    label,
    href,
    subnav[] {
      label,
      href
    }
  },
  whyUs[] {
    label,
    href,
    subnav[] {
      label,
      href
    }
  },
  existingCustomers[] {
    label,
    href,
    subnav[] {
      label,
      href
    }
  },
  aboutUs[] {
    label,
    href,
    subnav[] {
      label,
      href
    }
  }
}`;

export const globalQuery = `
  "globals": *[_type == "globals"][0],
  "navigation": ${navigationQuery}
`;
