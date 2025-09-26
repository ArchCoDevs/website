import { createClient } from 'next-sanity';

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.STORYBOOK_SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.STORYBOOK_SANITY_DATASET ||
  'production';
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  process.env.STORYBOOK_SANITY_API_VERSION ||
  '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false
});

const previewClient = createClient({
  projectId,
  dataset,
  perspective: 'previewDrafts',
  stega: {
    studioUrl: '/studio'
  },
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
});

export const sanityClient = (usePreview = false) =>
  usePreview ? previewClient : client;

export default sanityClient;
