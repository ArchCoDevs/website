import { ParsedUrlQueryInput } from 'querystring';
import { getQueryParam } from './get-query-param';
import { extractDistanceValue } from './extract-distance';
import { appendNumericParam, appendParam } from 'lib/helpers/parameter-helpers';

// Given the current query parameters, add location-related parameters to the API query.
export async function addLocationParams(
  apiQueryParams: URLSearchParams,
  query: ParsedUrlQueryInput,
  minSearchRadiusMiles: number
) {
  const location = getQueryParam(query, 'area')?.trim();
  const distance = extractDistanceValue(getQueryParam(query, 'distance'));
  if (location) {
    if (!/^[a-z]{3}\d+$/i.test(location)) {
      const response = await fetch(
        `/api/geolocation?search=${encodeURIComponent(location)}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.latitude && data.longitude) {
          appendParam(apiQueryParams, 'Latitude', `${data.latitude}`);
          appendParam(apiQueryParams, 'Longitude', `${data.longitude}`);
        }
        const radius = Math.max(
          minSearchRadiusMiles,
          (data.suggestedRadiusMiles ?? 0) + distance
        );
        appendNumericParam(apiQueryParams, 'Radius', radius.toString());
      } else {
        appendParam(apiQueryParams, 'SearchString', location);
      }
    }
  }
}
