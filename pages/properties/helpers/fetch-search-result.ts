// lib/api/fetchSearchResults.ts

import { NextRouter } from 'next/router';
import { RentalSpaceData } from 'lib/types/keystone.types';
import {
  appendParam,
  appendNumericParam,
  appendIntegerParam,
  appendDateParam
} from 'lib/helpers/parameter-helpers';
import { addLocationParams } from './add-location-params';
import { getPageSize } from './get-page-size';
import { getQueryParam } from './get-query-param';

export async function fetchSearchResults(
  page: number,
  router: NextRouter,
  viewMode: string,
  minSearchRadiusMiles: number,
  setSearchResults: (data: RentalSpaceData | null) => void,
  setIsLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
): Promise<void> {
  setIsLoading(true);
  setError(null);

  const apiQueryParams = new URLSearchParams();

  console.log('router.query', router.query);

  // Local helper to get query params from the router.
  const localGetQueryParam = (key: string): string | undefined =>
    getQueryParam(router.query, key);

  // Append basic search parameters.
  appendParam(apiQueryParams, 'SearchString', localGetQueryParam('area'));
  appendNumericParam(
    apiQueryParams,
    'MinPrice',
    localGetQueryParam('min-rent')
  );
  appendNumericParam(
    apiQueryParams,
    'MaxPrice',
    localGetQueryParam('max-rent')
  );
  appendNumericParam(apiQueryParams, 'SizeMin', localGetQueryParam('min-size'));
  appendNumericParam(apiQueryParams, 'SizeMax', localGetQueryParam('max-size'));

  const addedToSite = router.query['added-to-site'];
  if (addedToSite && addedToSite !== 'All') {
    console.log('addedToSite', addedToSite);
    appendDateParam(
      apiQueryParams,
      'AddedAfter',
      localGetQueryParam('added-to-site')
    );
  }

  const propertyTypes = router.query['property-type'] || [];
  const keyFeatures = router.query['key-features'] || [];

  if (Array.isArray(propertyTypes) && propertyTypes.length > 0) {
    if (propertyTypes.includes('Flexible Lease')) {
      const filteredPropertyTypes = propertyTypes.filter(
        (type) => type !== 'Flexible Lease'
      );
      apiQueryParams.append('Uses', filteredPropertyTypes.join(','));
      apiQueryParams.append('FlexLease', 'true');
    } else {
      apiQueryParams.append('Uses', propertyTypes.join(','));
    }
  } else if (typeof propertyTypes === 'string') {
    if (propertyTypes === 'Flexible Lease') {
      apiQueryParams.append('FlexLease', 'true');
    } else {
      apiQueryParams.append('Uses', propertyTypes);
    }
  }

  if (Array.isArray(keyFeatures) && keyFeatures.length > 0) {
    apiQueryParams.append('Features', keyFeatures.join(','));
  } else if (typeof keyFeatures === 'string') {
    apiQueryParams.append('Features', keyFeatures);
  }

  // Append pagination and sorting parameters.
  apiQueryParams.append('PageSize', getPageSize(viewMode).toString());
  appendIntegerParam(apiQueryParams, 'PageNumber', page.toString());

  if (localGetQueryParam('order-by')) {
    const [sortField, order] = (localGetQueryParam('order-by') as string).split(
      '-'
    );
    if (sortField) {
      appendParam(apiQueryParams, 'OrderBy', sortField);
    }
    if (order) {
      appendParam(
        apiQueryParams,
        'OrderAscending',
        order === 'asc' ? 'true' : 'false'
      );
    }
  }

  // Add location-based parameters.
  await addLocationParams(apiQueryParams, router.query, minSearchRadiusMiles);

  let searchQueryParams = apiQueryParams.toString();
  searchQueryParams = searchQueryParams.replace(/&Uses=All\+types/g, '');

  try {
    const response = await fetch(
      `/api/proxy/RentalSpace/Search?${searchQueryParams}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: RentalSpaceData = await response.json();
    console.log(data);
    setSearchResults(data);
  } catch (e) {
    setError('Failed to fetch search results. Please try again later.');
    console.error('Search error:', e);
  } finally {
    setIsLoading(false);
  }
}
