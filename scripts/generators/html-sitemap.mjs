import fs from 'fs';
import path from 'path';

// Define file paths
const sitemapPath = path.resolve('public', 'sitemap.xml');
const outputPath = path.resolve('pages', 'sitemap', 'index.page.tsx');

// Function to group URLs by top-level section
function groupUrlsBySection(urls) {
  const grouped = {};

  urls.forEach((url) => {
    const path = new URL(url).pathname.split('/').filter(Boolean);
    const section = path[0];

    if (!grouped[section]) {
      grouped[section] = [];
    }

    grouped[section].push(url);
  });

  return grouped;
}

// Parse XML Sitemap and generate HTML
async function generateHtmlSitemap() {
  try {
    // Read sitemap.xml
    const sitemapXml = await fs.promises.readFile(sitemapPath, 'utf-8');

    // Extract URLs using a regex
    const urls = Array.from(sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)).map(
      (match) => match[1]
    );

    // Sort URLs alphabetically
    const sortedUrls = urls.sort((a, b) => a.localeCompare(b));

    // Group URLs by section
    const groupedUrls = groupUrlsBySection(sortedUrls);

    // Create the React component for the sitemap page
    const sitemapPageContent = `
      import BaseLayout from 'templates/base-layout';
      const SitemapPage = () => (
        <BaseLayout title="Sitemap">
          <main>
            <h1 className="sitemap-header">Sitemap</h1>
            <ul className="sitemap-section-list">
              <li>
                <a href="/">/</a>
              </li>
            </ul>
            ${Object.entries(groupedUrls)
              .filter(([section]) => section !== 'undefined')
              .map(
                ([section, sectionUrls]) => `
              <section>
              <h2 className="sitemap-section-header">${section.replace(
                /-/g,
                ' '
              )}</h2>
                <ul className="sitemap-section-list">
                  ${sectionUrls
                    .map(
                      (url) => `
                    <li>
                      <a href="${url}">${url.replace(
                        'https://www.thearchco.com',
                        ''
                      )}</a>
                    </li>`
                    )
                    .join('')}
                </ul>
              </section>`
              )
              .join('')}
          </main>
        </BaseLayout>
      );

      export default SitemapPage;
    `;

    // Ensure the output directory exists
    const outputDir = path.dirname(outputPath);
    await fs.promises.mkdir(outputDir, { recursive: true });

    // Write the generated component to index.page.tsx
    await fs.promises.writeFile(outputPath, sitemapPageContent.trim(), 'utf-8');
    console.log(
      '✅ HTML Sitemap page with grouped sections generated successfully!'
    );
  } catch (error) {
    console.error('❌ Error generating HTML Sitemap:', error);
    process.exit(1);
  }
}

generateHtmlSitemap();
