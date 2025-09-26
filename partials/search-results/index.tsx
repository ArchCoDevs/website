import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from 'components/data-input/button';
import { EnquiryBar } from 'components/data-display/enquiry-bar';
import Select from 'components/data-input/select';
import { PropertyCard } from 'components/data-display/property-card';
import { Grid } from 'components/layout/grid';
import PropertyPageSkeleton from './skeleton';
import Pagination from 'components/navigation/pagination';
import { RentalSpaceData } from 'lib/types/keystone.types';

import styles from './styles.module.scss';

interface SearchResultsComponentProps {
  searchResults: RentalSpaceData | null;
  sortBy: { value: string };
  sortOptions: { value: string; label: string }[];
  isLoading: boolean;
  error: string | null;
  viewMode: string;
  currentPage: number;
  handleViewModeChange: (mode: 'list' | 'map') => void;
  onToggleFavourite: (
    rental_space_id: number,
    favourite: boolean
  ) => Promise<void>;
  handlePageChange: (page: number) => void;
  getPageSize: (mode: string) => number;
}

// Feature flags
const FF_ADD_TO_ENQUIRY = process.env.NEXT_PUBLIC_FF_ADD_TO_ENQUIRY === 'true';
// const FF_FLEX_LEASE = process.env.NEXT_PUBLIC_FF_FLEX_LEASE === 'true';

export const SearchResults: React.FC<SearchResultsComponentProps> = ({
  searchResults,
  sortBy,
  sortOptions,
  isLoading,
  error,
  viewMode,
  currentPage,
  handlePageChange,
  handleViewModeChange,
  onToggleFavourite,
  getPageSize
}) => {
  const router = useRouter();
  const [sortByValue, setSortByValue] = useState(sortBy.value);
  const [enquiryList, setEnquiryList] = useState<string[]>([]);

  useEffect(() => {
    setSortByValue(sortBy.value); // This ensures that the sortByValue state is always in sync with the sortBy prop
  }, [sortBy.value]);

  return (
    <section className={styles['results']}>
      <div>
        <div className={styles['search-title']}>
          <p>{searchResults?.search_string}</p>
        </div>

        <div className={styles['search-buttons']}>
          <Button
            variant="secondary"
            shape="squared"
            icon="map"
            label="Map View"
            onClick={() => {
              handleViewModeChange('map');
            }}
            alignIcon="right"
          />

          <Select
            name="sort"
            icon={sortByValue.includes('asc') ? 'sortasc' : 'sortdesc'}
            className={styles['sort-select']}
            options={sortOptions}
            value={sortByValue}
            onChange={(e) => {
              setSortByValue(e.target.value);
              router.push(
                {
                  pathname: '/properties',
                  query: {
                    ...router.query,
                    'order-by': e.target.value
                  }
                },
                undefined,
                { shallow: true }
              );
            }}
          />
        </div>
      </div>

      {FF_ADD_TO_ENQUIRY && enquiryList.length > 0 && (
        <EnquiryBar enquiryList={enquiryList} router={router} />
      )}

      {isLoading && <PropertyPageSkeleton count={getPageSize(viewMode)} />}

      {error && <p className={styles['error']}>{error}</p>}

      {searchResults &&
      searchResults.rental_space_model_list &&
      searchResults.rental_space_model_list?.length > 0 ? (
        <div>
          <Grid columns={3}>
            {searchResults.rental_space_model_list.map((property, index) => (
              <PropertyCard
                key={index}
                rental_space_id={property.rental_space_id}
                favourite={property.favourite}
                address={property.address}
                onSavedChange={onToggleFavourite}
                price_title={property.price_title}
                reference={property.reference}
                size_sq_ft={property.size_sq_ft || 0}
                thumbnail={property.thumbnail}
                use={property.use}
                is_flex_lease={property.is_flex_lease}
                selectable={FF_ADD_TO_ENQUIRY}
                selected={enquiryList.includes(property.reference)}
                onSelectedChange={(selected) => {
                  setEnquiryList(
                    (prev) =>
                      selected
                        ? [...prev, property.reference] // Add if selected
                        : prev.filter((ref) => ref !== property.reference) // Remove if not selected
                  );
                }}
              />
            ))}
          </Grid>

          <Pagination
            count={searchResults.total_pages}
            page={currentPage}
            onChange={handlePageChange}
            className={styles['pagination']}
          />
          <br />
          {FF_ADD_TO_ENQUIRY && enquiryList.length > 0 && (
            <EnquiryBar enquiryList={enquiryList} router={router} />
          )}
        </div>
      ) : (
        !isLoading && <p>No results found.</p>
      )}
    </section>
  );
};

export default SearchResults;
