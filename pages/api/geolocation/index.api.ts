import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

function deg2rad(degrees: number): number {
  return (degrees / 180) * Math.PI;
}

function calculateDistanceMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Radius of the Earth in miles
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in miles

  return d;
}

function calculateSearchRadiusMiles(
  southwestLat: number,
  southwestLong: number,
  northeastLat: number,
  northeastLong: number
): number {
  const eastDistance = calculateDistanceMiles(
    southwestLat,
    southwestLong,
    southwestLat,
    northeastLong
  );
  const northDistance = calculateDistanceMiles(
    southwestLat,
    southwestLong,
    northeastLat,
    southwestLong
  );

  const maxWidthOrHeight = Math.max(eastDistance, northDistance);
  const searchRadius = maxWidthOrHeight / 2;

  return searchRadius;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: 'Google Maps API key is not configured' });
    }

    const tailoredSearch = `${search}`?.endsWith(', UK')
      ? `${search}`
      : `${search}, UK`;

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          tailoredSearch
        )}&key=${encodeURIComponent(apiKey)}`
      );

      const { results } = response.data;

      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        const bounds =
          results[0].geometry.bounds || results[0].geometry.viewport;

        const radius = calculateSearchRadiusMiles(
          bounds.southwest.lat,
          bounds.southwest.lng,
          bounds.northeast.lat,
          bounds.northeast.lng
        );

        return res.status(200).json({
          latitude: lat,
          longitude: lng,
          suggestedRadiusMiles: radius
        });
      } else {
        return res.status(404).json({ error: 'No results found' });
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
      return res.status(500).json({ error: 'Error fetching geocoding data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
