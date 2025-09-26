import { useRouter } from 'next/router';

// A helper to change view mode using Next.js router.
export function handleViewModeChange(
  router: ReturnType<typeof useRouter>,
  newViewMode: 'list' | 'map'
) {
  router.push(
    {
      pathname: '/properties',
      query: { ...router.query, view: newViewMode }
    },
    undefined,
    { shallow: true }
  );
}
