import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers.host || '';

  // Check if the domain contains "staging"
  const isStaging = host.includes('staging');

  let robotsContent: string;

  if (isStaging) {
    // Disallow all for staging domains
    robotsContent = `User-agent: *
Disallow: /

# Staging environment - no indexing allowed`;
  } else {
    // Allow all for production domains
    robotsContent = `User-agent: *
Allow: /

# Production environment - allow indexing
Sitemap: ${req.headers['x-forwarded-proto'] || 'https'}://${host}/sitemap.xml`;
  }

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(robotsContent);
}
