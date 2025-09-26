import React, { useState, useEffect } from 'react';
import { parseISO, isValid, isBefore } from 'date-fns';
import classNames from 'classnames';
import Form from '../form';
import PropertySearch from 'components/data-input/property-search';
import InputFactory from 'components/factories/input-factory';
import Button from 'components/data-input/button';
import Fieldset from 'components/data-input/fieldset';
import { useForm, useWatch, SubmitHandler, Controller } from 'react-hook-form';
import { handleErrors } from 'lib/helpers/handle-errors';
import {
  addedToSite,
  rentMin,
  rentMax,
  sizeMin,
  sizeMax
} from './form-options';
import styles from './styles.module.scss';
import Label from 'components/data-input/label';
import Checkbox from 'components/data-input/checkbox';
import { ParsedUrlQueryInput } from 'querystring';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'form'> {
  name?: string;
  id?: string;
  propertyUseTypes?: string[];
  keyFeatures?: string[];
  onSearch: (value: ParsedUrlQueryInput) => void;
  onReset: () => void;
  defaultValues?: Partial<Inputs>;
  showSearchInput?: boolean;
  showAdvancedSearch?: boolean;
  isInMap?: boolean;
}

type Inputs = {
  location: { area: string; distance: number };
  'property-type': string[];
  'key-features': string[];
  'min-size': number | string;
  'max-size': number | string;
  'min-rent': number | string;
  'max-rent': number | string;
  'added-to-site': string;
};

export const AdvancedSearch: React.FC<Props> = ({
  name = 'property-search-form',
  id = 'property-search-form',
  propertyUseTypes = [],
  keyFeatures,
  className,
  onSearch,
  onReset,
  defaultValues,
  showAdvancedSearch = false,
  showSearchInput = true,
  isInMap = false,
  ...props
}) => {
  const [showFilters, setShowFilters] = useState(showAdvancedSearch);
  const [propertyUseTypesState, setPropertyUseTypesState] =
    useState(propertyUseTypes);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!showSearchInput || showAdvancedSearch) {
      setShowFilters(true);
    } else {
      setShowFilters(false);
    }
  }, [showSearchInput, showAdvancedSearch]);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [defaultValues]);

  useEffect(() => {
    if (!showAdvancedSearch) {
      setShowFilters(false);
    }
  }, [showAdvancedSearch]);

  useEffect(() => {
    console.log('propertyUseTypes', propertyUseTypes);
    // if Flexible Lease is not in the propertyUseTypes array, add it
    if (!propertyUseTypesState.includes('Flexible Lease')) {
      setPropertyUseTypesState([...propertyUseTypesState, 'Flexible Lease']);
    }
  }, [propertyUseTypesState]);

  const defaultFormValues = {
    'added-to-site': 'All',
    location: { area: '', distance: 0 },
    'property-type': [],
    'key-features': [],
    'min-size': 'No min',
    'max-size': 9999999,
    'min-rent': 'No min',
    'max-rent': 9999999
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      'added-to-site': 'All',
      location: { area: '', distance: 0 },
      'property-type': [],
      'key-features': [],
      'min-size': 'No min',
      'max-size': 9999999,
      'min-rent': 'No min',
      'max-rent': 9999999,
      ...defaultValues
    }
  });

  useEffect(() => {
    if (defaultValues) {
      const mergedValues = { ...defaultFormValues, ...defaultValues };
      if (
        mergedValues['added-to-site'] &&
        mergedValues['added-to-site'] !== 'All' &&
        typeof mergedValues['added-to-site'] === 'string'
      ) {
        const parsedDate = parseISO(mergedValues['added-to-site']);
        if (isValid(parsedDate)) {
          const closestOption = addedToSite.find(
            (option) =>
              isValid(parseISO(option.value)) &&
              isBefore(parseISO(option.value), new Date())
          );
          mergedValues['added-to-site'] = closestOption?.value || 'All';
        }
      }

      // Retain the current form state and only override with default values where needed
      reset((prevValues) => ({
        ...prevValues,
        ...mergedValues
      }));
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    if (defaultValues) {
      reset({ ...defaultFormValues, ...defaultValues });
    }
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault();
    setShowFilters(false);
    const refinedData = {
      ...data,
      area: data?.location?.area,
      distance: data?.location?.distance,
      location: undefined
    };
    onSearch(JSON.parse(JSON.stringify(refinedData)));
  };

  const propertyTypeValues = useWatch({ control, name: 'property-type' });

  const renderSearchInput = () => (
    <Fieldset className={styles['primary-search']}>
      <h2 className={styles['search-header']}>Search area</h2>
      <div className={styles['search']}>
        <Controller
          name="location"
          control={control}
          render={({ field: { onChange, value } }) => (
            <PropertySearch
              id="location"
              name="location"
              className={styles['area-search']}
              value={{
                area: value.area,
                distance: `${value?.distance}`
              }}
              onChange={onChange}
              required
            />
          )}
        />
        <Button
          variant="tertiary"
          shape="squared"
          className={styles['main-search-btn']}
          icon="search"
        >
          Search
        </Button>
        <Button
          variant="secondary"
          transparent
          className={cx(styles['filter-toggle'], showFilters && styles['open'])}
          onClick={(e) => {
            e.preventDefault();
            setShowFilters(!showFilters);
          }}
          data-testid="filter-toggle"
          icon="filter"
        >
          Filter
        </Button>
      </div>
    </Fieldset>
  );

  const renderFilterOptions = () => (
    <div
      className={cx(styles['slide-panel'], showFilters && styles['visible'])}
    >
      <Fieldset className={styles['filtered-search']} legend="Edit your search">
        <div
          className={cx(styles['buttons'], {
            [styles['in-map']]: isInMap
          })}
        >
          <Button
            variant="secondary"
            icon="refresh"
            alignIcon="right"
            shape="squared"
            className={styles['reset']}
            onClick={(e) => {
              e.preventDefault();
              onReset();
            }}
          >
            Reset filters
          </Button>
          <Button
            variant="tertiary"
            shape="squared"
            className={styles['apply']}
          >
            Find properties
          </Button>
        </div>
        <div className={cx(styles['checkbox-group'], 'mt-2')}>
          <Fieldset className={styles['fieldset']}>
            <legend className={styles['legend']}>Property type</legend>
            {propertyUseTypesState.map((type) => (
              <Label
                id={type}
                key={type}
                text={type}
                position="after"
                parent
                className={styles['label']}
              >
                <Checkbox
                  id={type}
                  value={type}
                  className={styles['checkbox']}
                  {...register('property-type')}
                  defaultChecked={defaultValues?.['property-type']?.includes(
                    type
                  )}
                  disabled={
                    propertyTypeValues?.includes('All types') &&
                    type !== 'All types'
                  }
                />
              </Label>
            ))}
          </Fieldset>
        </div>

        <div className={styles['checkbox-group']}>
          <Fieldset className={styles['fieldset']}>
            <legend className={styles['legend']}>Key features</legend>
            {keyFeatures?.map((type) => (
              <Label
                id={type}
                key={type}
                text={type}
                position="after"
                parent
                className={styles['label']}
              >
                <Checkbox
                  id={type}
                  value={type}
                  className={styles['checkbox']}
                  {...register('key-features')}
                  defaultChecked={defaultValues?.['key-features']?.includes(
                    type
                  )}
                />
              </Label>
            ))}
          </Fieldset>
        </div>

        <Fieldset className={styles['bottom-section']}>
          <div className={styles['two-up']}>
            <span className={styles['label']}>Sizes</span>
            <div>
              <InputFactory
                variant="select"
                label="Min size"
                hideLabel
                options={sizeMin}
                defaultValue={defaultValues?.['min-size']?.toString()}
                {...handleErrors(errors, 'min-size')}
                {...register('min-size')}
              />
              <InputFactory
                variant="select"
                label="Max size"
                hideLabel
                options={sizeMax}
                defaultValue={
                  defaultValues?.['max-size']?.toString() || '200000+'
                }
                {...handleErrors(errors, 'max-size')}
                {...register('max-size')}
              />
            </div>
          </div>
          <div className={styles['two-up']}>
            <span className={styles['label']}>Monthly rent</span>
            <div>
              <InputFactory
                variant="select"
                label="Min rent"
                hideLabel
                options={rentMin}
                defaultValue={defaultValues?.['min-rent']?.toString()}
                {...handleErrors(errors, 'min-rent')}
                {...register('min-rent')}
              />
              <InputFactory
                variant="select"
                label="Max rent"
                hideLabel
                options={rentMax}
                defaultValue={
                  defaultValues?.['max-rent']?.toString() || '10000+'
                }
                {...handleErrors(errors, 'max-rent')}
                {...register('max-rent')}
              />
            </div>
          </div>
          <InputFactory
            variant="select"
            label="Added to site"
            options={addedToSite}
            defaultValue={defaultValues?.['added-to-site'] || 'All'}
            {...handleErrors(errors, 'added-to-site')}
            {...register('added-to-site')}
          />
        </Fieldset>
      </Fieldset>
    </div>
  );

  return (
    <Form
      key={key}
      name={name}
      id={id}
      className={cx(styles['advanced-search'], className)}
      onSubmit={handleSubmit(onSubmit)}
      action="/"
      {...props}
    >
      {showSearchInput && renderSearchInput()}
      {renderFilterOptions()}
    </Form>
  );
};

AdvancedSearch.displayName = 'AdvancedSearch';

export default AdvancedSearch;
