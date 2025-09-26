import verifyRecaptchaToken from 'lib/helpers/validate-recaptcha';
import { NextApiRequest, NextApiResponse } from 'next';

interface ApiResponse {
  id?: string;
  display_message?: string;
}

interface SignUpPayload {
  FirstName: string;
  LastName: string;
  Password: string;
  Phone: string;
  Username: string;
}

interface SignUpPayloadWithRecaptcha extends SignUpPayload {
  RecaptchaToken: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { FirstName, LastName, Password, Phone, Username, RecaptchaToken } =
      req.body as SignUpPayloadWithRecaptcha;

    if (!(await verifyRecaptchaToken(RecaptchaToken))) {
      return res.status(400).json({
        message: 'You must verify that you are a human'
      });
    }

    if (!FirstName || !LastName || !Password || !Username) {
      return res.status(400).json({
        message:
          'FirstName, LastName, Password, and Username (email) are required'
      });
    }

    if (
      typeof FirstName !== 'string' ||
      typeof LastName !== 'string' ||
      typeof Password !== 'string' ||
      typeof Username !== 'string' ||
      (Phone && typeof Phone !== 'string')
    ) {
      return res.status(400).json({ message: 'Invalid input types' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Username)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const payload: SignUpPayload = {
      FirstName,
      LastName,
      Password,
      Phone: Phone || '',
      Username
    };

    const apiResponse = await fetch(
      `${process.env.KEYSTONE_API_URL}/User/Register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Token: `${process.env.SERVICE_ACCOUNT_TOKEN}`
        },
        body: JSON.stringify(payload)
      }
    );

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error(errorData.message || `API error: ${apiResponse.status}`);
    }

    const apiData: ApiResponse = await apiResponse.json();

    if (apiData.display_message) {
      return res.status(400).json({ message: apiData.display_message });
    }

    return res.status(201).json({
      message: 'User created successfully',
      user: { id: apiData.id, email: Username }
    });
  } catch (error) {
    console.error('Sign-up error:', error);
    return res
      .status(500)
      .json({ message: 'An error occurred during sign-up. Please try again.' });
  }
}
