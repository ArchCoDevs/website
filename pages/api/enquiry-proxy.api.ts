import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import verifyRecaptchaToken from 'lib/helpers/validate-recaptcha';

interface EnquiryPayload {
  // Define the properties expected in the enquiry payload, e.g.,
  name: string;
  email: string;
  message: string;
  RecaptchaToken: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .setHeader('Allow', ['POST'])
      .status(405)
      .end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { RecaptchaToken, ...enquiryData } = req.body as EnquiryPayload;

    // Verify ReCaptcha token
    if (!(await verifyRecaptchaToken(RecaptchaToken))) {
      return res.status(400).json({
        success: false,
        message: 'You must verify that you are a human'
      });
    }

    // Make the request to the Keystone API
    const response = await axios.post(
      `${process.env.KEYSTONE_API_URL}/Enquiry/CreateEnquiry`,
      enquiryData,
      {
        headers: {
          Token: process.env.SERVICE_ACCOUNT_TOKEN,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({
      success: response.data.success,
      message: response.data.display_message
    });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
}
