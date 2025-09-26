import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const MAX_RETRIES = 3;
const INITIAL_TIMEOUT = 60000; // 60 seconds

/* eslint-disable */
const ALLOWED_URL_PATHS: { [key: string]: Array<RegExp> } = {
  GET: [
    /^RentalSpace\/Search$/,
    /^RentalSpace\/Location$/,
    /^RentalSpace\/Features$/,
    /^RentalSpace\/UseClass$/,
    /^User\/GetUserDetails$/,
    /^User\/GetFavourites$/
  ],
  POST: [/^User\/Favourite$/, /^User\/Update$/, /^Enquiry\/CreateEnquiry$/],
  DELETE: [/^User\/Deactivate$/]
};
/* eslint-enable */

function isAllowedRequest(method?: string, partialPath?: string) {
  if (method === undefined || partialPath === undefined) {
    return false;
  }

  // Get the path part, without the query parameters
  const pathNoQueryString = partialPath.split('?', 1)[0];

  const patterns = ALLOWED_URL_PATHS[method] ?? [];

  return patterns.some((re) => re.test(pathNoQueryString));
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 0
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
    console.log(`Request timed out after ${INITIAL_TIMEOUT * (retries + 1)}ms`);
  }, INITIAL_TIMEOUT * (retries + 1));

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (retries < MAX_RETRIES) {
      console.warn(
        `Retrying request (attempt ${retries + 1} of ${MAX_RETRIES})`
      );
      return fetchWithRetry(url, options, retries + 1);
    }
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path, ...queryParams } = req.query;

  const pathString = Array.isArray(path) ? path.join('/') : path;

  if (!isAllowedRequest(req.method, pathString)) {
    console.info(
      `Blocked proxy request, method ${req.method} to path ${pathString}`
    );

    res.status(404).json({
      error: 'Not found'
    });

    return;
  }

  let apiUrl = `${process.env.KEYSTONE_API_URL}/${pathString}`;

  // Add query parameters to the URL
  const searchParams = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    } else if (value) {
      searchParams.append(key, value as string);
    }
  });

  const queryString = searchParams.toString();
  if (queryString) {
    apiUrl += `?${queryString}`;
  }

  // console.log('Constructed API URL:', apiUrl);

  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const customToken = token?.customToken as string | undefined;

    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Connection', 'close');
    headers.set('User-Agent', 'WEBSITE');

    if (customToken?.length) {
      headers.set('Token', customToken);
    } else {
      headers.set('Token', `${process.env.SERVICE_ACCOUNT_TOKEN}`);
    }

    // Set the host header to match the Keystone API
    headers.set('Host', new URL(apiUrl).host);

    const fetchOptions: RequestInit = {
      method: req.method,
      headers: headers
    };

    // Only add body for non-GET and non-HEAD requests
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      fetchOptions.body = JSON.stringify(req.body || {});
    }

    // console.log('Request to Keystone API:', {
    //   ...fetchOptions,
    //   url: apiUrl
    // });

    const response = await fetchWithRetry(apiUrl, fetchOptions);

    // console.log('Received response from Keystone API:', {
    //   status: response.status,
    //   statusText: response.statusText,
    //   headers: Object.fromEntries(response.headers.entries())
    // });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      res.status(response.status).end();
      return;
    }

    const contentLength = response.headers.get('content-length');
    const hasContent = contentLength && parseInt(contentLength) > 0;

    if (hasContent) {
      const data = await response.json();
      // console.log('Response data:', data);
      res.status(response.status).json(data);
    } else {
      // console.log('Response has no content');
      res.status(response.status).end();
    }
  } catch (error) {
    console.error('Error in API route:', error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Request was aborted (likely due to timeout)');
        res.status(504).json({
          error: 'Gateway Timeout',
          details:
            'The request to the Keystone API timed out after multiple attempts'
        });
      } else {
        res.status(500).json({
          error: 'Error proxying request',
          details: error.message
        });
      }
    } else {
      res
        .status(500)
        .json({ error: 'Error proxying request', details: 'Unknown error' });
    }
  }
}
