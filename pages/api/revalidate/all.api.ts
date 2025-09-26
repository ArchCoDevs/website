import { NextApiRequest, NextApiResponse } from 'next';
import { revalidatePath } from 'next/cache';

export default function all(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response(
        'Missing environment variable SANITY_REVALIDATE_SECRET',
        { status: 500 }
      );
    }

    if (req.headers['x-secret-key'] !== process.env.SANITY_REVALIDATE_SECRET) {
      return res.status(401).json({ message: 'Not allowed' });
    }

    revalidatePath('/', 'layout');
    return res.status(200).json({ message: 'Revalidated all routes' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err instanceof Error ? err.message : 'An error occurred'
    });
  }
}
