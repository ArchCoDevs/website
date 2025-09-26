import { sanityClient } from 'lib/helpers/sanity-client';
import { globalQuery } from 'lib/data/sanity-queries';
import { Globals, Navigation } from 'lib/types/sanity.types';

export interface BaseQuery {
  globals: Globals;
  navigation: Navigation;
  preview: boolean;
}

export async function sanityQuery({
  query,
  params,
  preview,
  noGlobals
}: {
  query?: string;
  params?: Record<string, unknown>;
  preview?: boolean;
  noGlobals?: boolean;
}) {
  const stitchedQuery = noGlobals
    ? query || ''
    : `{
        ${globalQuery},${query}
      }`;

  try {
    const client = sanityClient(preview);
    const data = await client.fetch(stitchedQuery, params, {
      next: {
        revalidate: 3600
      }
    });
    return {
      ...data,
      preview
    };
  } catch (error) {
    console.error('Failed to fetch global data:', error);
    throw new Error(
      'Could not fetch global data, with query: ' + stitchedQuery
    );
  }
}

export default sanityQuery;
