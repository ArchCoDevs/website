import React, { useState } from 'react';
import { Suspense } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { Button } from 'components/data-input/button';
import { PropertySearch } from 'components/data-input/property-search';
import { AdvancedSearch } from 'components/forms/advanced-search';
import { Loader } from 'components/feedback/loader';
import { PropertyCard } from 'components/data-display/property-card';
import { Map } from 'components/data-display/map';
import { Padding } from 'components/layout/padding';
import { Grid } from 'components/layout/grid';
import { SideBar } from 'components/layout/side-bar';
import styles from './styles.module.scss';
import cx from 'classnames';
import type { DefaultValues } from 'pages/properties/types/default-values';
import { RentalSpaceData } from 'lib/types/keystone.types';
import { Props as PropertyCardProps } from 'components/data-display/property-card';

interface MapViewComponentProps {
  viewMode: 'list' | 'map';
  searchResults: RentalSpaceData | null;
  searchOptions: {
    features: string[];
    uses: string[];
  };
  defaultValues: DefaultValues;
  handleViewModeChange: (mode: 'list' | 'map') => void;
  handleSearch: (updatedParams: ParsedUrlQueryInput) => void;
  handleReset: () => void;
  onToggleFavourite: (
    rental_space_id: number,
    favourite: boolean
  ) => Promise<void>;
}

const MapView: React.FC<MapViewComponentProps> = ({
  viewMode,
  searchResults,
  searchOptions,
  defaultValues,
  handleViewModeChange,
  handleSearch,
  handleReset,
  onToggleFavourite
}) => {
  const router = useRouter();

  const [showMapFilterOptions, setShowMapFilterOptions] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyCardProps>();

  // Initialize localSearch with area from URL if available
  const [localSearch, setLocalSearch] = useState({
    area: (router.query.area as string) || '', // Default to query param or empty string
    distance: '+ 0 miles'
  });

  const handleSearchClick = () => {
    const queryParams = new URLSearchParams();
    Object.entries(router.query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v));
      } else if (value !== undefined) {
        queryParams.set(key, value);
      }
    });
    queryParams.set('area', localSearch.area);
    queryParams.set('distance', localSearch.distance);
    router.push({
      pathname: '/properties',
      query: Object.fromEntries(queryParams.entries())
    });
  };

  const SIMILAR_PROPERTIES_COUNT = 10;

  return (
    <Suspense fallback={<Loader />}>
      <div className={styles['map-view']}>
        <div className={styles['map-view-header']}>
          <div className={styles['map-view-header-search']}>
            <PropertySearch
              name="PropertySearch"
              id="location"
              value={localSearch}
              onChange={setLocalSearch}
            />

            <Button
              variant="tertiary"
              icon="search"
              hideLabel
              shape="squared"
              onClick={handleSearchClick}
              className={styles['search-button']}
              label="Search"
            />

            <Button
              variant="secondary"
              shape="squared"
              icon="filter"
              label={showMapFilterOptions ? 'Back' : 'Filters'}
              className={styles['map-view-header-filter']}
              onClick={() => {
                setShowMapFilterOptions((v) => !v);
                setSelectedProperty(undefined);
              }}
              alignIcon="right"
            />
          </div>
        </div>

        <SideBar
          isOpen={showMapFilterOptions}
          className={styles['map-view-sidebar']}
        >
          <AdvancedSearch
            showSearchInput={false}
            name="AdvancedSearch"
            onSearch={handleSearch}
            onReset={handleReset}
            keyFeatures={searchOptions.features}
            propertyUseTypes={searchOptions.uses}
            defaultValues={defaultValues}
            showAdvancedSearch={showMapFilterOptions}
            isInMap
            className={styles['advanced-search']}
          />
        </SideBar>

        <SideBar
          isOpen={!!selectedProperty}
          className={styles['map-view-sidebar']}
        >
          {selectedProperty && (
            <Padding vertical>
              <Grid columns={1}>
                <Button
                  variant="secondary"
                  shape="squared"
                  icon="chevron"
                  label="Back"
                  fullWidth
                  className={styles['back-button']}
                  onClick={() => {
                    setShowMapFilterOptions(false);
                    setSelectedProperty(undefined);
                  }}
                  alignIcon="left"
                />
                <div>
                  <PropertyCard
                    {...selectedProperty}
                    onSavedChange={onToggleFavourite}
                  />
                </div>

                <hr />

                <h2 className="heading-small">
                  Similar properties matching your criteria
                </h2>

                <Grid columns={1}>
                  {searchResults?.rental_space_model_list
                    ?.slice(0, SIMILAR_PROPERTIES_COUNT)
                    .map((property) => (
                      // @ts-ignore - This is using the same props as the PropertyCard component
                      <PropertyCard key={property.address} {...property} mini />
                    ))}
                </Grid>
              </Grid>
            </Padding>
          )}
        </SideBar>

        <div
          className={cx(styles['map-view-main'], {
            [styles['sidebar-open']]:
              (showMapFilterOptions || !!selectedProperty) && viewMode === 'map'
          })}
        >
          <Button
            variant="secondary"
            shape="squared"
            icon="close"
            label="Close map"
            className={styles['map-view-main-back-button']}
            onClick={() => {
              handleViewModeChange('list');
              setSelectedProperty(undefined);
              setShowMapFilterOptions(false);
            }}
            alignIcon="right"
          />
          <Map
            onSelectionChange={(poi) => {
              setSelectedProperty(poi as unknown as PropertyCardProps);
              setShowMapFilterOptions(false);
            }}
            properties={
              searchResults?.rental_space_model_list
                ? searchResults.rental_space_model_list.map((property) => ({
                    ...property,
                    size_sq_ft: property.size_sq_ft ?? 0,
                    size_sq_mt: property.size_sq_mt ?? 0,
                    use: (property.use as string) ?? 'Unknown'
                  }))
                : []
            }
          />
        </div>
      </div>
    </Suspense>
  );
};

export default MapView;
