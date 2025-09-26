import React, { useEffect, useState } from 'react';

type Review = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
};

type ReviewsResponse = {
  name?: string;
  rating?: number;
  user_ratings_total?: number;
  reviews: Review[];
};

export type Props = React.ComponentProps<'section'> & {
  placeId: string;
  language?: string;
  minRating?: number;
  limit?: number;
};

export function GoogleReviews({
  placeId,
  language = 'en',
  minRating = 0,
  limit = 5,
  className,
  ...sectionProps
}: Props) {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);
    fetch(
      `/api/google/reviews?placeId=${encodeURIComponent(
        placeId
      )}&language=${encodeURIComponent(language)}`
    )
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || `Request failed with ${res.status}`);
        }
        return res.json();
      })
      .then((json: ReviewsResponse) => {
        if (!isMounted) return;
        setData(json);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        const message =
          typeof err === 'object' && err && 'message' in err
            ? String((err as { message?: string }).message)
            : 'Failed to load reviews';
        setError(message);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [placeId, language]);

  const filtered = (data?.reviews || [])
    .filter((r) => r.rating >= minRating)
    .slice(0, limit);

  if (isLoading) return <div className={className}>Loading reviews…</div>;
  if (error)
    return <div className={className}>Could not load Google reviews.</div>;
  if (!data || filtered.length === 0)
    return <div className={className}>No reviews yet.</div>;

  const Star = ({
    fraction,
    size = 16,
    idSuffix
  }: {
    fraction: number;
    size?: number;
    idSuffix?: string;
  }) => {
    const clamped = Math.max(0, Math.min(1, fraction));
    const gradId = `star-grad-${idSuffix || 'default'}`;
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        aria-hidden="true"
        role="img"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset={`${clamped * 100}%`} stopColor="#fbbc04" />
            <stop offset={`${clamped * 100}%`} stopColor="#e2e8f0" />
          </linearGradient>
        </defs>
        <path
          d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.953L10 0l2.949 5.957 6.561.953-4.755 4.635 1.123 6.545z"
          fill={`url(#${gradId})`}
        />
      </svg>
    );
  };

  const formatDate = (unix?: number) => {
    if (!unix) return '';
    try {
      const d = new Date(unix * 1000);
      return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  const InitialBadge = ({ name }: { name: string }) => {
    const letter = (name?.trim()?.[0] || '?').toUpperCase();
    return (
      <div
        aria-hidden="true"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#e8f0fe',
          color: '#1a73e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 18
        }}
      >
        {letter}
      </div>
    );
  };

  const renderHeader = () => {
    const ratingValue = typeof data.rating === 'number' ? data.rating : 0;
    const total =
      typeof data.user_ratings_total === 'number'
        ? data.user_ratings_total
        : undefined;
    return (
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 6
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            <span style={{ color: '#1a73e8' }}>G</span>
            <span style={{ color: '#ea4335' }}>o</span>
            <span style={{ color: '#fbbc04' }}>o</span>
            <span style={{ color: '#1a73e8' }}>g</span>
            <span style={{ color: '#34a853' }}>l</span>
            <span style={{ color: '#ea4335' }}>e</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>Reviews</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>
            {ratingValue.toFixed(1)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={`hdr-${i}`}
                idSuffix={`hdr-${i}`}
                size={20}
                fraction={Math.max(0, Math.min(1, ratingValue - i))}
              />
            ))}
          </div>
          {typeof total === 'number' && (
            <div style={{ color: '#6b7280' }}>({total.toLocaleString()})</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      className={`${className ? `${className} ` : ''}needs-bottom-margin`}
      {...sectionProps}
    >
      {renderHeader()}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gap: 16
        }}
      >
        {filtered.map((r, idx) => (
          <li
            key={`${r.author_name}-${r.time}-${idx}`}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: 16,
              background: '#fff',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 12
              }}
            >
              <InitialBadge name={r.author_name} />
              <div>
                <div style={{ fontWeight: 600 }}>{r.author_name}</div>
                <div>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>
                    {formatDate(r.time)}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  idSuffix={`card-${idx}-${i}`}
                  fraction={Math.max(0, Math.min(1, r.rating - i))}
                />
              ))}
            </div>
            {r.text && (
              <p style={{ marginTop: 6, lineHeight: 1.6 }}>{r.text}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
