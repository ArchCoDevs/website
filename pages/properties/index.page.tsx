import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import BaseLayout from 'templates/base-layout';
import { useSearchParams } from 'next/navigation';
import sanityQuery, { BaseQuery } from 'lib/helpers/sanity-query';
import { toggleFavourite } from 'lib/helpers/toggle-favourite';

import type { RentalSpaceData } from 'lib/types/keystone.types';

import type { LocationsPageProps } from './types/props';

import { Main } from 'components/layout/main';
import { AdvancedSearch } from 'components/forms/advanced-search';

import MapView from 'partials/map-view';
import SearchResults from 'partials/search-results';
import appConfig from 'app-config';

import { minSearchRadiusMiles, sortOptions } from './helpers/default-data';
import { getDefaultValues } from './helpers/default-values';
import { getPageSize } from './helpers/get-page-size';
import { handleViewModeChange } from './helpers/handle-view-mode-change';
import { fetchSearchResults } from './helpers/fetch-search-result';
import {
  handlePageChange,
  handleReset,
  handleSearch
} from './helpers/form-handlers';

function PropertySearch({
  locationsData,
  searchOptions,
  globals,
  navigation
}: LocationsPageProps & BaseQuery) {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams() || new URLSearchParams();

  const [searchResults, setSearchResults] = useState<RentalSpaceData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [error, setError] = useState<string | null>(null);
  const [paramsReady, setParamsReady] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(
    searchParams.get('show-adv-search') === '1'
  );

  useEffect(() => {
    setShowAdvancedSearch(searchParams.get('show-adv-search') === '1');
  }, [searchParams]);

  const viewMode = useMemo(() => {
    return (router.query.view as string) === 'map' ? 'map' : 'list';
  }, [router.query.view]);

  // Local wrapper so the helper function gets the current router.
  const onViewModeChange = (newViewMode: 'list' | 'map') => {
    handleViewModeChange(router, newViewMode);
  };

  // When the router is ready (and advanced search isn’t shown) update page, sort, and fetch results.
  useEffect(() => {
    if (router.isReady && !showAdvancedSearch) {
      const page = parseInt((router.query.page as string) ?? '1', 10);
      setCurrentPage(page);

      const orderBy = router.query['order-by'] as string;
      if (orderBy) {
        setSortBy(
          sortOptions.find((o) => o.value === orderBy) ?? {
            label: '',
            value: ''
          }
        );
      } else {
        setSortBy(sortOptions[0]);
      }

      fetchSearchResults(
        page,
        router,
        viewMode,
        minSearchRadiusMiles,
        setSearchResults,
        setIsLoading,
        setError
      );
    }
  }, [router.isReady, router.query, showAdvancedSearch]);

  useEffect(() => {
    if (router.isReady) {
      setParamsReady(true);
    }
  }, [router.isReady, searchParams]);

  const defaultValues = useMemo(
    () => getDefaultValues(searchParams),
    [searchParams]
  );

  const onToggleFavourite = toggleFavourite(session);

  if (viewMode === 'map') {
    return (
      <MapView
        viewMode={viewMode}
        searchResults={searchResults}
        searchOptions={searchOptions}
        defaultValues={defaultValues}
        handleViewModeChange={onViewModeChange}
        handleSearch={(updatedParams) =>
          handleSearch(router, updatedParams, viewMode, sortBy, setCurrentPage)
        }
        handleReset={() => handleReset(router)}
        onToggleFavourite={onToggleFavourite}
      />
    );
  }

  return (
    <BaseLayout title={'Search'} globals={globals} navigation={navigation}>
      <Main>
        <div>
          {paramsReady && (
            <AdvancedSearch
              name="AdvancedSearch"
              onSearch={(updatedParams) =>
                handleSearch(
                  router,
                  updatedParams,
                  viewMode,
                  sortBy,
                  setCurrentPage
                )
              }
              onReset={() => handleReset(router)}
              keyFeatures={searchOptions.features}
              propertyUseTypes={searchOptions.uses}
              defaultValues={defaultValues}
              showAdvancedSearch={showAdvancedSearch || searchParams.size < 1}
            />
          )}
          <hr />
        </div>
        {searchParams.size > 0 && !showAdvancedSearch && (
          <SearchResults
            key={sortBy.value}
            searchResults={searchResults}
            sortBy={sortBy}
            sortOptions={sortOptions}
            isLoading={isLoading}
            error={error}
            viewMode={viewMode}
            currentPage={currentPage}
            handlePageChange={(page) =>
              handlePageChange(router, page, setCurrentPage)
            }
            handleViewModeChange={onViewModeChange}
            onToggleFavourite={onToggleFavourite}
            getPageSize={getPageSize}
          />
        )}
        <section>
          <ul>
            {!!locationsData?.length &&
              locationsData.map((locationData) => (
                <li key={locationData._id}>
                  <a href={`/properties/${locationData.slug?.current}`}>
                    {locationData.title}
                  </a>
                </li>
              ))}
          </ul>
        </section>
      </Main>
    </BaseLayout>
  );
}

export async function getStaticProps({ preview = false }) {
  const data = await sanityQuery({
    preview,
    query: `"locationsData": *[_type == "location"]`
  });

  const features = await (
    await fetch(`${process.env.KEYSTONE_API_URL}/RentalSpace/Features`, {
      headers: {
        'Content-Type': 'application/json',
        Token: process.env.SERVICE_ACCOUNT_TOKEN as string
      }
    })
  ).json();

  const usesRes = await (
    await fetch(`${process.env.KEYSTONE_API_URL}/RentalSpace/UseClass`, {
      headers: {
        'Content-Type': 'application/json',
        Token: process.env.SERVICE_ACCOUNT_TOKEN as string
      }
    })
  ).json();

  const uses = ['All types', ...usesRes];

  const locations = (
    await (
      await fetch(`${process.env.KEYSTONE_API_URL}/RentalSpace/Location`, {
        headers: {
          'Content-Type': 'application/json',
          Token: process.env.SERVICE_ACCOUNT_TOKEN as string
        }
      })
    ).json()
  ).map((location: { name: string }) => location.name);

  return {
    props: {
      ...data,
      searchOptions: {
        features,
        uses,
        locations
      }
    },
    revalidate: appConfig.defaultRevalidationSeconds.contentOnly
  };
}

export default PropertySearch;
