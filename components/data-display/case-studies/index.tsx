import React, { useEffect, useState } from 'react';
import { CaseStudy } from 'lib/types/sanity.types';
import { Grid } from 'components/layout/grid';
import { ContentCard } from 'components/data-display/content-card';

export type Props = React.ComponentProps<'section'> & {
  caseStudies: number;
  orderRank: 'latest' | 'random';
};

export function CaseStudies({
  className,
  caseStudies,
  orderRank,
  ...sectionProps
}: Props) {
  const [data, setData] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const limit =
          Number.isFinite(caseStudies) && caseStudies > 0 ? caseStudies : 6;
        const order = orderRank === 'random' ? 'random' : 'latest';

        const res = await fetch(
          `/api/case-studies?limit=${limit}&order=${order}`
        );
        if (!res.ok) throw new Error('Network response was not ok');
        const json = (await res.json()) as { pageData?: CaseStudy[] };
        if (isSubscribed) setData(json.pageData || []);
      } catch (err) {
        if (isSubscribed) {
          setError('Failed to load case studies');
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isSubscribed = false;
    };
  }, [caseStudies, orderRank]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data?.length) return <div>No data</div>;

  return (
    <section className={className} {...sectionProps}>
      <Grid columns={3} as="ul">
        {data.map((item) => (
          <li key={item._id}>
            <ContentCard
              title={item.title || ''}
              content={item.summary || ''}
              image={item.heroImage}
              ctaType="button"
              linkText={item.linkText || 'Read More'}
              linkUrl={`/hear-from-our-customers/${item.slug.current}`}
            />
          </li>
        ))}
      </Grid>
    </section>
  );
}
