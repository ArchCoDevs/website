// Return the page size based on the view mode.
export function getPageSize(viewMode: string): number {
  return viewMode === 'map' ? 999999999 : 9;
}
