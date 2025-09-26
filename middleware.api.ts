import { NextRequest, NextResponse } from 'next/server';

const generateCsp = (): string => {
  const production = process.env.NODE_ENV === 'production';

  const connectSrc = [
    process.env.NEXT_PUBLIC_API_ROOT,
    process.env.NEXT_PUBLIC_API_DOMAIN,
    process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    process.env.KEYSTONE_API_DOMAIN,
    'https://maps.googleapis.com',
    'https://*.google-analytics.com',
    'https://*.analytics.google.com',
    'https://*.googletagmanager.com',
    'https://www.googleadservices.com',
    'https://*.g.doubleclick.net',
    'https://ad.doubleclick.net',
    'https://*.google.com',
    'https://*.google.co.uk',
    'https://*.googlesyndication.com',
    'https://*.clarity.ms',
    'https://px.ads.linkedin.com',
    'https://bat.bing.com',
    'https://bat.bing.net',
    'https://analytics.tiktok.com',
    'https://analytics-ipv6.tiktokw.us',
    'https://*.outbrain.com',
    'https://*.infinity-tracking.com',
    'https://*.infinity-tracking.net',
    'https://*.cookiebot.com/',
    'https://*.cookiebot.eu/',
    'wss://*.sanity.io',
    'https://*.sanity.io',
    'https://*.veritonic.com'
  ];

  const imgSrc = [
    "'self'",
    'https://cdn.sanity.io',
    'https://*.bfldr.com',
    'https://maps.googleapis.com',
    'https://maps.gstatic.com',
    'https://*.googleusercontent.com',
    'https://lh3.googleusercontent.com',
    'https://*.google-analytics.com',
    'https://*.analytics.google.com',
    'https://*.googletagmanager.com',
    'https://googletagmanager.com',
    'https://*.g.doubleclick.net',
    'https://google.com',
    'https://*.google.com',
    'https://*.google.co.uk',
    'https://*.googlesyndication.com',
    'https://ssl.gstatic.com',
    'https://www.gstatic.com',
    'https://fonts.gstatic.com',
    'https://secure.7-companycompany.com',
    'https://bat.bing.com',
    'https://*.cookiebot.com/',
    'https://www.googleadservices.com',
    'https://px.ads.linkedin.com',
    'https://www.facebook.com',
    'https://*.clarity.ms',
    'https://*.infinity-tracking.com',
    'https://*.infinity-tracking.net',
    'https://*.outbrain.com',
    'https://*.veritonic.com',
    'data:'
  ];

  const mediaSrc = [
    "'self'",
    'https://cdn.sanity.io',
    'https://*.bfldr.com',
    'data:'
  ];

  const styleSrc = [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
    'https://googletagmanager.com',
    'https://www.googletagmanager.com',
    'https://tagmanager.google.com'
  ];

  const scriptSrc = [
    "'self'",
    'https://connect.facebook.net',
    'https://www.facebook.net',
    'https://snap.licdn.com',
    'https://analytics.tiktok.com',
    'https://www.google.com',
    'https://www.gstatic.com',
    'https://maps.googleapis.com',
    'https://www.youtube.com',
    'https://*.outbrain.com',
    'https://*.veritonic.com',
    'https://*.googletagmanager.com',
    'https://googletagmanager.com',
    'https://tagmanager.google.com',
    'https://*.g.doubleclick.net',
    'https://bat.bing.com',
    'https://secure.7-companycompany.com',
    'https://www.googleadservices.com',
    'https://*.clarity.ms',
    'https://*.infinity-tracking.com',
    'https://*.infinity-tracking.net',
    'https://*.cookiebot.com/',
    'https://*.cookiebot.eu/',
    'https://vercel.live',
    'https://*.infinity-tracking.com',
    'https://*.infinity-tracking.net'
  ];

  const fontSrc = ["'self'", 'https://fonts.gstatic.com', 'data:'];

  const frameSrc = [
    'self',
    'https://td.doubleclick.net',
    'https://15246811.fls.doubleclick.net',
    'https://www.googletagmanager.com',
    'https://transform-arch-dev.sanity.studio',
    'https://www.google.com',
    'https://*.cookiebot.com',
    'https://*.youtube.com',
    'https://vercel.live'
  ];

  // Always include 'unsafe-inline' for GTM to work properly
  scriptSrc.push("'unsafe-inline'");

  if (production) {
    // Include hash values in production for better security where possible
    scriptSrc.push(
      "'sha256-O3f9ExKh285g88vgmC76GNEESxKb4dAFqQDHcrONUnA='",
      "'sha256-mjAPvJKRBATPwtDkDe1t+tw2mbmVjgXVfYImJfeAdz8='",
      "'sha256-NQfc27RODJMCUmaqjMwdfn4W0gAOlXht1ZZm3Yldg8E='",
      "'sha256-NL3lMONbbuwW+m8yubla4Fquc4IejqJdnVDR8ngkArs='",
      "'sha256-THax3ReKS9dFWN9U81BkRtB/IEjRKKf/vofUNL80R8Q='",
      "'sha256-jXMxQq4fTIL3TMI6BegJcpCUgUO9k7Wb8cq7VxjkJEY='",
      "'sha256-uvPKxhDesEQ5bcLoWO6GdmXQzyvSxwivAvpA5wFthxY='",
      "'sha256-Q2kvZYuU1RXnSdIMih84b1zkV2ox134915W79UAaUYQ='",
      "'sha256-ySNe2dZJ2v8OklD+xnZXYA/IQX24u1pSc8eeiOFEdQs='",
      "'sha256-getf+oM1FdETjdKXZk6QkFtlb1wxPEbwLqvaobUTNH8='"
    );
  } else {
    // Include 'unsafe-eval' only in development
    scriptSrc.push("'unsafe-eval'");
  }

  let csp = `default-src 'self';`;

  if (production) {
    csp += `frame-ancestors 'self' https://transform-arch-dev.sanity.studio;`;
  }

  csp += `style-src ${styleSrc.join(' ')};`;
  csp += `connect-src 'self' ${connectSrc.join(' ')} ${
    production ? '' : 'ws://localhost:3000'
  };`;
  csp += `script-src ${scriptSrc.join(' ')};`;
  csp += `script-src-elem ${scriptSrc.join(' ')};`;
  csp += `img-src ${imgSrc.join(' ')};`;
  csp += `media-src ${mediaSrc.join(' ')};`;
  csp += `font-src 'self' ${fontSrc.join(' ')};`;
  csp += `frame-src 'self' ${frameSrc.join(' ')};`;
  csp += `object-src 'none';`;
  csp += `base-uri 'self';`;
  csp += `form-action 'self';`;
  csp += `upgrade-insecure-requests;`;

  return csp;
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const gclidValues = url.searchParams.getAll('gclid');
  const gclid = gclidValues[0];

  const existingGclid = request.cookies.get('gclid')?.value;

  if (gclid) {
    const response = NextResponse.next();

    if (!existingGclid || existingGclid !== gclid) {
      console.log(
        'Setting gclid cookie:',
        gclid,
        existingGclid ? `(replacing: ${existingGclid})` : '(new)'
      );

      response.cookies.set('gclid', gclid, {
        path: '/',
        httpOnly: false,
        sameSite: 'lax'
        // No maxAge = session cookie (expires when browser closes)
      });
    } else {
      console.log('gclid already exists and matches, skipping cookie update');
    }

    return response;
  }

  // Generate CSP header
  const cspHeader = generateCsp()
    .replace(/\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Content-Security-Policy', cspHeader);
  requestHeaders.set('X-Content-Type-Options', 'nosniff');
  requestHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  requestHeaders.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), fullscreen=(self)'
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), fullscreen=(self)'
  );

  console.log('=== MIDDLEWARE END (CSP only) ===');
  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
};
