const { createClient } = require('@sanity/client');

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

/** Fetch dynamic routes for /why-us/[slug] */
async function fetchWhyUsPages() {
  const query = /* groq */ `
    *[
      _type in ["generalInformation", "twoColumnEditorial", "landingPage"] &&
      references(*[_type == "whyUs"][0]._id) &&
      defined(slug.current) &&
      !(_id in path("drafts.**"))
    ] {
      "slug": slug.current
    }
  `;
  const docs = await client.fetch(query);
  console.log('[next-sitemap] whyUs pages:', docs);

  return docs.map((doc) => ({
    loc: `/why-us/${doc.slug}`,
    changefreq: 'daily',
    priority: 0.7
  }));
}

/** Fetch dynamic routes for /about-us/[slug] */
async function fetchAboutUsPages() {
  const query = /* groq */ `
    *[
      _type in ["generalInformation", "twoColumnEditorial", "landingPage"] &&
      references(*[_type == "aboutUs"][0]._id) &&
      defined(slug.current) &&
      !(_id in path("drafts.**"))
    ] {
      "slug": slug.current
    }
  `;
  const docs = await client.fetch(query);
  console.log('[next-sitemap] aboutUs pages:', docs);

  return docs.map((doc) => ({
    loc: `/about-us/${doc.slug}`,
    changefreq: 'daily',
    priority: 0.7
  }));
}

/** Fetch dynamic routes for featured-locations */
async function fetchFeaturedLocations() {
  const query = /* groq */ `
    *[_type == "featuredLocations" && defined(slug.current) &&
      !(_id in path("drafts.**"))] {
      "slug": slug.current
    }
  `;
  const docs = await client.fetch(query);
  console.log('[next-sitemap] featuredLocations docs:', docs);
  return docs.map((doc) => ({
    loc: `/featured-locations/${doc.slug}`,
    changefreq: 'daily',
    priority: 0.7
  }));
}

/** Fetch dynamic routes for featured-locations/[location]/[slug] */
async function fetchFeaturedLocationsSubs() {
  const query = /* groq */ `
    *[_type == "featuredLocationsSub" && defined(slug.current) && defined(parent->slug.current) &&
      !(_id in path("drafts.**"))] {
      "slug": slug.current,
      "parentSlug": parent->slug.current
    }
  `;
  const docs = await client.fetch(query);
  console.log('[next-sitemap] featuredLocationsSub docs:', docs);

  return docs.map((doc) => ({
    loc: `/featured-locations/${doc.parentSlug}/${doc.slug}`,
    changefreq: 'daily',
    priority: 0.7
  }));
}

/** Fetch dynamic routes for news-and-reports */
async function fetchNewsAndReports() {
  const query = /* groq */ `
    *[_type == "newsArticle" && defined(slug.current) &&
      !(_id in path("drafts.**"))] {
      "slug": slug.current
    }
  `;
  const docs = await client.fetch(query);
  console.log('[next-sitemap] newsArticle docs:', docs);
  return docs.map((doc) => ({
    loc: `/news-and-reports/${doc.slug}`,
    changefreq: 'daily',
    priority: 0.7
  }));
}

/** Fetch dynamic route for find-your-space/[space] */

/** Fetch dynamic routes for find-your-space/[space] */
async function fetchFindYourSpace() {
  const query = /* groq */ `
    *[_type == "findYourSpace" && defined(slug.current) &&
      !(_id in path("drafts.**"))] {
      "slug": slug.current
    }
  `;
  const docs = await client.fetch(query);
  console.log('[next-sitemap] find-your-space pages:', docs);

  return docs.map((doc) => ({
    loc: `/find-your-space/${doc.slug}`,
    changefreq: 'daily',
    priority: 0.7
  }));
}

/** Fetch dynamic routes for /find-your-space/[space]/[slug] */
async function fetchFindYourSpaceSub() {
  const query = /* groq */ `
    *[
      _type in ["generalInformation", "twoColumnEditorial", "landingPage"] &&
      defined(parent->slug.current) &&
      defined(slug.current) &&
      !(_id in path("drafts.**"))
    ] {
      "parentSlug": parent->slug.current,
      "slug": slug.current
    }
  `;
  const docs = await client.fetch(query);
  console.log('[next-sitemap] find-your-space sub-pages:', docs);

  return docs.map((doc) => ({
    loc: `/find-your-space/${doc.parentSlug}/${doc.slug}`,
    changefreq: 'daily',
    priority: 0.7
  }));
}

/** Fetch dynamic routes for /hear-from-our-customers/[slug] */
async function fetchHearFromOurCustomers() {
  const query = /* groq */ `
    *[_type == "caseStudy" && defined(slug.current) &&
      !(_id in path("drafts.**"))] {
      "slug": slug.current
    }
  `;
  const docs = await client.fetch(query);
  console.log('[next-sitemap] hear-from-our-customers pages:', docs);

  return docs.map((doc) => ({
    loc: `/hear-from-our-customers/${doc.slug}`,
    changefreq: 'daily',
    priority: 0.7
  }));
}

/** Fetch dynamic routes for /support-for-existing-customers/[slug] */
async function fetchSupportForExistingCustomers() {
  const query = /* groq */ `
    *[
      _type in ["generalInformation", "twoColumnEditorial", "landingPage"] &&
      references(*[_type == "existingCustomers"][0]._id) &&
      defined(slug.current) &&
      !(_id in path("drafts.**"))
    ] {
      "slug": slug.current
    }
  `;
  const docs = await client.fetch(query);
  console.log('[next-sitemap] support-for-existing-customers pages:', docs);

  return docs.map((doc) => ({
    loc: `/support-for-existing-customers/${doc.slug}`,
    changefreq: 'daily',
    priority: 0.7
  }));
}

/** Fetch dynamic routes for /support-for-existing-customers/[slug]/[child] */
async function fetchSupportForExistingCustomersChild() {
  const query = /* groq */ `
    *[
      _type in ["generalInformation", "twoColumnEditorial", "landingPage"] &&
      defined(parent->slug.current) &&
      defined(slug.current) &&
      references(*[_type == "existingCustomers"][0]._id) &&
      !(_id in path("drafts.**"))
    ] {
      "parentSlug": parent->slug.current,
      "childSlug": slug.current
    }
  `;
  const docs = await client.fetch(query);
  console.log(
    '[next-sitemap] support-for-existing-customers child pages:',
    docs
  );

  return docs
    .filter((doc) => doc.parentSlug && doc.childSlug) // Filter out any entries with missing parentSlug or childSlug
    .map((doc) => ({
      loc: `/support-for-existing-customers/${doc.parentSlug}/${doc.childSlug}`,
      changefreq: 'daily',
      priority: 0.7
    }));
}

/** GET KEYSTONE LISTINGS */
/** Fetch dynamic routes for /properties/[p_ref] */
async function fetchProperties() {
  const apiUrl =
    'https://keystone.thearchco.com/WebServices_CS/rest/RentalSpace/Search?Radius=10000&SearchString=london&PageSize=9999';
  const headers = {
    Token: process.env.SERVICE_ACCOUNT_TOKEN,
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      console.error('[next-sitemap] Failed to fetch property data');
      return [];
    }

    const data = await response.json();

    console.log('[next-sitemap] Property data:', data);

    if (!data?.rental_space_model_list?.length) {
      console.error('[next-sitemap] No properties found');
      return [];
    }

    return data.rental_space_model_list.map((property) => ({
      loc: `/properties/${property.reference}`,
      changefreq: 'daily',
      priority: 0.7
    }));
  } catch (error) {
    console.error('[next-sitemap] Error fetching property data:', error);
    return [];
  }
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.thearchco.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/404',
    '/500',
    '/400',
    '/sitemap',
    '/api/*',
    '/login',
    '/logout',
    '/register',
    '/my-account',
    '/my-account/*',
    '/reset-password',
    '/forgot-password'
  ],
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/my-account',
          '/api',
          '/login',
          '/logout',
          '/register',
          '/reset-password',
          '/forgot-password'
        ]
      }
    ]
  },
  additionalPaths: async (config) => {
    const whyUsPages = await fetchWhyUsPages();
    const featuredLocations = await fetchFeaturedLocations();
    const featuredLocationsSubs = await fetchFeaturedLocationsSubs();
    const newsAndReports = await fetchNewsAndReports();
    const aboutUsPages = await fetchAboutUsPages();
    const findYourSpace = await fetchFindYourSpace();
    const findYourSpaceSubs = await fetchFindYourSpaceSub();
    const hearFromOurCustomers = await fetchHearFromOurCustomers();
    const supportForExistingCustomers =
      await fetchSupportForExistingCustomers();
    const supportForExistingCustomersChild =
      await fetchSupportForExistingCustomersChild();
    const properties = await fetchProperties();

    console.log('[next-sitemap] whyUsPages:', whyUsPages);
    console.log('[next-sitemap] featuredLocations:', featuredLocations);
    console.log('[next-sitemap] featuredLocationsSubs:', featuredLocationsSubs);
    console.log('[next-sitemap] newsAndReports:', newsAndReports);
    console.log('[next-sitemap] aboutUsPages:', aboutUsPages);
    console.log('[next-sitemap] findYourSpace:', findYourSpace);
    console.log('[next-sitemap] findYourSpaceSubs:', findYourSpaceSubs);
    console.log('[next-sitemap] hearFromOurCustomers:', hearFromOurCustomers);
    console.log(
      '[next-sitemap] supportForExistingCustomers:',
      supportForExistingCustomers
    );
    console.log(
      '[next-sitemap] supportForExistingCustomersChild:',
      supportForExistingCustomersChild
    );
    console.log('[next-sitemap] properties:', properties);

    return [
      ...whyUsPages,
      ...featuredLocations,
      ...featuredLocationsSubs,
      ...newsAndReports,
      ...aboutUsPages,
      ...findYourSpace,
      ...findYourSpaceSubs,
      ...hearFromOurCustomers,
      ...supportForExistingCustomers,
      ...supportForExistingCustomersChild,
      ...properties
    ];
  }
};
