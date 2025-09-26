export interface SitemapItem {
  loc: string; // The URL of the page
  lastmod?: string; // Optional: The last modified date
  changefreq?: string; // Optional: Change frequency (e.g., daily, weekly)
  priority?: number; // Optional: Priority of the URL (e.g., 0.7)
}
