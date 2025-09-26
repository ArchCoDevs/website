import { ParsedUrlQueryInput } from 'querystring';
import { NextRouter } from 'next/router';

export const handlePageChange = (
  router: NextRouter,
  newPage: number,
  setCurrentPage: (page: number) => void
) => {
  setCurrentPage(newPage);
  router.push(
    {
      pathname: '/properties',
      query: { ...router.query, page: newPage.toString() }
    },
    undefined
  );
};

export const handleSearch = (
  router: NextRouter,
  updatedParams: ParsedUrlQueryInput,
  viewMode: string,
  sortBy: { value: string },
  setCurrentPage: (page: number) => void
) => {
  const newParams = {
    ...updatedParams,
    page: '1',
    view: viewMode,
    'order-by': sortBy.value
  };
  setCurrentPage(1);
  router.push(
    {
      pathname: '/properties',
      query: newParams
    },
    undefined
  );
};

export const handleReset = (router: NextRouter) => {
  const currentViewMode = router.query.view || 'list';
  const currentArea = router.query.area || '';
  const currentDistance = router.query.distance || '50';
  const currentShowAdvancedSearch = router.query['show-adv-search'] || '';

  const url = `/properties?show-adv-search=${encodeURIComponent(
    currentShowAdvancedSearch.toString()
  )}&area=${encodeURIComponent(
    currentArea.toString()
  )}&distance=${encodeURIComponent(
    currentDistance.toString()
  )}&order-by=distance-asc&view=${encodeURIComponent(
    currentViewMode.toString()
  )}`;
  window.location.href = url;
};
