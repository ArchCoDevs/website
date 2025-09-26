# Project Name: The Arch Company

## Overview

This website was developed using **Next.js** and **TypeScript** to deliver a robust, scalable, and maintainable web application. It leverages **Sanity** as the headless CMS for managing content and **Storybook** for developing and testing UI components in isolation.

## Technologies Used

- **Next.js**: A React framework that enables server-side rendering, static site generation, and more.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, providing better tooling at any scale.
- **Sanity**: A headless CMS that offers a flexible and customizable content management experience.
- **Storybook**: A UI component development tool that allows for building and testing components in isolation.

## Running the Site Locally

### Prerequisites

Before running the site locally, ensure you have the following installed:

- **Node.js** (version 18.x or higher)
- **pnpm** (preferred package manager)

### Steps to Run Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-repo.git (Get this location from IT support)
   cd your-repo
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:

   - Create a `.env.local` file in the root of your project.
   - Add necessary environment variables such as API keys, Sanity project details, etc.

4. **Run the development server**:

   ```bash
   pnpm run dev
   ```

   The website will be available at `http://localhost:3000`.

5. **Running Storybook**:

   To start Storybook for component development:

   ```bash
   pnpm run storybook
   ```

   Storybook will be available at `http://localhost:6006`.

NOTE: You can also run `pnpm run devkit` to run all of the services (apart from Sanity) at once.

### Google Reviews (Places API)

Server-side endpoint: `pages/api/google/reviews.api.ts`

- Query params: `placeId` (required), `language` (optional, default `en`).
- Returns: `{ name, rating, user_ratings_total, reviews: [{ author_name, profile_photo_url, rating, relative_time_description, text, time }] }`.

Environment variable required:

- `GOOGLE_MAPS_API_KEY` (preferred) or `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (fallback). Use a server-only key with Places API enabled.

Example usage in a page/component:

```tsx
import GoogleReviews from 'components/google/Reviews';

export default function ReviewsSection() {
  return (
    <GoogleReviews
      placeId="YOUR_GOOGLE_PLACE_ID"
      language="en"
      minRating={4}
      limit={3}
    />
  );
}
```

Notes:

- The API route calls the Google Places Details API with `fields=rating,user_ratings_total,reviews`.
- Reviews returned by Google can be limited and not guaranteed for every place.
- Consider caching responses (e.g., with SWR or server-side caching) to reduce API usage.

### Running the Test Suite

To run the test suite you need the Playwright browsers installed. You also need to have the local Storybook server running.

```bash
pnpm dlx playwright install
pnpm run storybook
```

You can then run the test suite:

```bash
pnpm run test
```

This will run the storybook tests.

## Additional Information

- **Build for production**: To build the project for production use:

  ```bash
  pnpm run build
  ```

- **Sanity Studio**: You will need to clone the 'CMS' repo and then you can run `pnpm run dev` to run sanity studio

## Deploying to Vercel

1. Push the repository to GitHub.
2. In Vercel, import the GitHub repo and select the `Next.js` framework preset.
3. Build settings:
   - Install Command: `pnpm install`
   - Build Command: `pnpm run build`
   - Output Directory: `.next` (default)
4. Configure environment variables (Project Settings → Environment Variables):
   - `NEXT_PUBLIC_API_ROOT`
   - `NEXT_PUBLIC_API_DOMAIN`
   - `NEXT_PUBLIC_AUTH_DOMAIN`
   - `KEYSTONE_API_DOMAIN`
   - `GOOGLE_MAPS_API_KEY`
5. Trigger a deployment by pushing to your default branch.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to contribute or raise issues if you encounter any problems!
