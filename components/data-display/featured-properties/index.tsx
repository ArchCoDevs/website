import React from 'react';

/* Import Stylesheet */

import PropertySearchResult from 'lib/types/property-search-result';
import PropertyCard from '../property-card';
import Grid from 'components/layout/grid';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The an array of locations to display
   * @default []
   */
  properties: PropertySearchResult[];
  /**
   * List title
   * @default 'Quick Links'
   */
  title?: string;
  /**
   * The onSavedChange function is called when the user clicks the save button on a property card
   */
  onSavedChange?: (
    rental_space_id: number,
    favourite: boolean
  ) => Promise<void>;
}

/**
 * Featured Locations is a component that displays a list of 2-3 featured locations
 * it is designed to be used within the ComponentFactory
 */
export const FeaturedProperties: React.FC<Props> = ({
  properties = [],
  title = 'Featured Properties',
  onSavedChange,
  className,
  ...props
}: Props) => (
  <div className={className} {...props} data-testid="featured-locations">
    <h2 className={'heading-small mb-2'}>{title}</h2>
    <Grid columns={properties?.length || 0} data-testid="locations-grid">
      {properties?.map((property) => (
        <PropertyCard
          {...property}
          key={property.rental_space_id}
          onSavedChange={onSavedChange}
          data-testid="property-card"
        />
      ))}
    </Grid>
  </div>
);

export default FeaturedProperties;
