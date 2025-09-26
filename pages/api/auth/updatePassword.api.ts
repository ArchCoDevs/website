import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { password1, resetCode } = req.body;

    if (!password1) {
      return res.status(400).json({ message: 'Password is required' });
    }

    if (typeof password1 !== 'string') {
      return res.status(400).json({ message: 'Invalid input type' });
    }

    const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    if (!pwRegex.test(password1)) {
      return res.status(400).json({ message: 'Invalid password format' });
    }

    const apiResponse = await fetch(
      `${process.env.KEYSTONE_API_URL}/User/UpdatePassword`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Token: `${process.env.SERVICE_ACCOUNT_TOKEN}`
        },
        body: JSON.stringify({
          NewPassword: password1,
          UpdatePasswordId: resetCode
        })
      }
    );

    if (!apiResponse.ok) {
      throw new Error(`API error: ${apiResponse.status}`);
    }

    const apiData = await apiResponse.json();

    if (!apiData.success) {
      return res
        .status(400)
        .json({ message: apiData.display_message || 'Password reset failed' });
    }

    return res.status(200).json({
      message: apiData.display_message || 'Password reset successful.'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
