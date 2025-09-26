import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type GoogleReview = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
};

type GooglePlaceDetailsResponse = {
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    reviews?: GoogleReview[];
  };
  status: string;
  error_message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { placeId, language = 'en' } = req.query;

  if (!placeId || typeof placeId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing required query param: placeId' });
  }

  const apiKey =
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return res
      .status(500)
      .json({ error: 'Google Maps API key is not configured' });
  }

  const fields = ['name', 'rating', 'user_ratings_total', 'reviews'].join(',');

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId
    )}&fields=${encodeURIComponent(fields)}&language=${encodeURIComponent(
      String(language)
    )}&key=${encodeURIComponent(apiKey)}`;

    const response = await axios.get<GooglePlaceDetailsResponse>(url, {
      timeout: 10000
    });

    if (response.data.status !== 'OK') {
      const status = response.data.status;
      const message =
        response.data.error_message || 'Failed to fetch place details';
      return res.status(502).json({ error: message, status });
    }

    const result = response.data.result || {};
    const reviews = (result.reviews || []).map((r) => ({
      author_name: r.author_name,
      profile_photo_url: r.profile_photo_url,
      rating: r.rating,
      relative_time_description: r.relative_time_description,
      text: r.text,
      time: r.time
    }));

    return res.status(200).json({
      name: result.name,
      rating: result.rating,
      user_ratings_total: result.user_ratings_total,
      reviews
    });
  } catch (error: any) {
    const message =
      error?.response?.data?.error_message || error?.message || 'Unknown error';
    return res.status(500).json({ error: message });
  }
}
