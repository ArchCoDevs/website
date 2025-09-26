import { Grid } from 'components/layout/grid';
import { PropertyCardSkeleton } from 'components/data-display/property-card/skeleton';

export interface Props extends React.ComponentProps<'section'> {
  /**
   * The number of property cards to display in the skeleton.
   */
  count?: number;
}

/**
 * The Skeleton loader for the Property Card component displays a skeleton of a property card.
 */
export const PropertyPageSkeleton: React.FC<Props> = ({ count = 9 }) => {
  return (
    <Grid columns={3}>
      {[...Array(count)].map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </Grid>
  );
};

export default PropertyPageSkeleton;
