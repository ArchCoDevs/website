import { FeaturedLocations } from 'lib/types/sanity.types';

export interface LocationsPageProps {
  locationsData: FeaturedLocations[] | null;
  preview: boolean;
  searchOptions: {
    features: string[];
    uses: string[];
    locations: string[];
  };
}
