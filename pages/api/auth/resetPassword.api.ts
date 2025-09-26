import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (typeof email !== 'string') {
      return res.status(400).json({ message: 'Invalid input type' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const apiResponse = await fetch(
      `${
        process.env.KEYSTONE_API_URL
      }/User/ForgotPassword?EmailAddress=${encodeURIComponent(email)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Token: `${process.env.SERVICE_ACCOUNT_TOKEN}`
        }
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
      message:
        apiData.display_message || 'Password reset email sent successfully'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
