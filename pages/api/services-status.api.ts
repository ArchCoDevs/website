// pages/api/services-status.ts

import type { NextApiRequest, NextApiResponse } from 'next';

type SanityStatus = {
  page: {
    id: string;
    name: string;
    url: string;
    time_zone: string;
    updated_at: string;
  };
  status: {
    indicator: string;
    description: string;
  };
};

type ServiceStatus = {
  name: string;
  status: 'OK' | 'Not OK';
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const services: ServiceStatus[] = [];

  try {
    const sanityResponse = await fetch(
      'https://www.sanity-status.com/api/v2/status.json'
    );

    if (!sanityResponse.ok) {
      throw new Error('Failed to fetch Sanity status');
    }

    const sanityData: SanityStatus = await sanityResponse.json();

    services.push({
      name: 'Sanity',
      status: sanityData.status.indicator === 'none' ? 'OK' : 'Not OK'
    });

    const keystoneResponse = await fetch(
      `${process.env.KEYSTONE_API_URL}/Heartbeat`
    );

    services.push({
      name: 'Keystone Dev',
      status: keystoneResponse.ok ? 'OK' : 'Not OK'
    });

    res.status(200).json({ services });
  } catch (error) {
    console.error('Error checking services status:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: (error as Error).message
    });
  }
}
