// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import people from 'lib/mocks/people';

type Person = (typeof people)[0];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Person | { message: string }>
) {
  const { name } = req.query;
  // If no LSID is provided, return a 400
  if (!name) {
    res.status(400).json({ message: 'Name is required' });
    return;
  }

  const person = people.find((person) => person.name === name);
  if (!person) {
    res
      .status(404)
      .json({ message: `No user with name \'${name}\' could be found` });
    return;
  }
  res.status(200).json(person);
}
