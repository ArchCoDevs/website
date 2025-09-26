// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import users from 'lib/mocks/users';
import type User from 'lib/types/user';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { message: string }>
) {
  const { username } = req.query;

  const user = users.find((user) => user.username === username);
  if (!user) {
    res
      .status(404)
      .json({ message: `No user with username '${username}' could be found` });
    return;
  }
  res.status(200).json(user);
}
