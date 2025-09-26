// Extract a numeric distance value from a string.
export function extractDistanceValue(str: string | undefined): number {
  if (!str) return 0;
  const numericPart = str.match(/(\d+(?:\.\d+)?|\d+\/\d+)/);
  if (!numericPart) return 0;
  if (numericPart[0].includes('/')) {
    const [numerator, denominator] = numericPart[0].split('/').map(Number);
    return numerator / denominator;
  }
  return parseFloat(numericPart[0]);
}
