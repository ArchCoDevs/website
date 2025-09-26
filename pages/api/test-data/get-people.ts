// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import people from 'lib/mocks/people';

type People = typeof people;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<People | { message: string }>
) {
  res.status(200).json(people);
}
