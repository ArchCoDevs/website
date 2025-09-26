import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from 'lib/helpers/sanity-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { limit = 6, order = 'latest' } = req.query;
    const numericLimit = Math.max(1, Math.min(50, Number(limit) || 6));
    const client = sanityClient(false);
    if (order === 'random') {
      const query = `*[_type == "caseStudy"] | order(_createdAt desc) [0...$limit]`;
      const data = await client.fetch(query, { limit: 100 });
      const shuffled = (Array.isArray(data) ? data : []).sort(
        () => Math.random() - 0.5
      );
      const pageData = shuffled.slice(0, numericLimit);
      res.status(200).json({ pageData });
      return;
    }

    const query = `*[_type == "caseStudy"] | order(_createdAt desc) [0...$limit]`;
    const pageData = await client.fetch(query, { limit: numericLimit });

    res.status(200).json({ pageData });
  } catch (error) {
    console.error('API: case-studies failed', error);
    res.status(500).json({ error: 'Failed to fetch case studies' });
  }
}
