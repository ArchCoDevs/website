import { ParsedUrlQueryInput } from 'querystring';

// Return a single query parameter from the router query.
export function getQueryParam(
  query: ParsedUrlQueryInput,
  key: string
): string | undefined {
  const value = query[key];
  return Array.isArray(value) ? value[0] : value;
}
