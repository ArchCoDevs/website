// Safely parse an integer or return undefined.
export function parseIntSafe(value: string | null): number | undefined {
  if (value === null) return undefined;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? undefined : parsed;
}
