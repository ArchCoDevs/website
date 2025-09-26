import { parseIntSafe } from './parse-int-safe';

import type { DefaultValues } from '../types/default-values';

// Build the default values for AdvancedSearch from URL search parameters.
export function getDefaultValues(searchParams: URLSearchParams): DefaultValues {
  return {
    location: {
      area: searchParams.get('area') ?? '',
      distance: parseFloat(searchParams.get('distance') ?? '0') || 0
    },
    'property-type': searchParams.getAll('property-type'),
    'key-features': searchParams.getAll('key-features'),
    'max-size': parseIntSafe(searchParams.get('max-size')) ?? 9999999,
    'min-size': parseIntSafe(searchParams.get('min-size')),
    'max-rent': parseIntSafe(searchParams.get('max-rent')) ?? 9999999,
    'min-rent': parseIntSafe(searchParams.get('min-rent')),
    'added-to-site': searchParams.get('added-to-site') || 'All',
    age: parseInt(searchParams.get('page') ?? '1', 10)
  };
}
