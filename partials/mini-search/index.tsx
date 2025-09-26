import { useState } from 'react';
import classNames from 'classnames';

import Link from 'components/data-display/link';

/* Import Components */
import Form from 'components/forms/form';
import Label from 'components/data-input/label';
import Button from 'components/data-input/button';
import PropertySearch from 'components/data-input/property-search';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/** Import custom types */
export interface Props extends React.ComponentProps<'form'> {
  /**
   * The name of the MiniSearch form
   * @default 'property-search'
   */
  name?: string;
  /**
   * The id of the MiniSearch
   * @default 'property-search'
   */
  id?: string;
  /**
   * The callback function to handle the form submission
   */
  onSearch: (value: { area: string; distance: string }) => void;
  /**
   * Show the extended version? (used on the homepage)
   * @default false
   */
  extended?: boolean;
  /**
   * Show the full width version of the form
   */
  fullWidth?: boolean;
  /**
   * Align the form to the left or center
   * @default 'center'
   */
  align?: 'left' | 'center';
}

/**
 * The `MiniSearch` component a small form for searching properties.
 * You can leave the name and id properties empty unless you need multiple
 * instances of the form on the same page.
 */
export const MiniSearch: React.FC<Props> = ({
  name = 'property-search-form',
  id = 'property-search-form',
  extended,
  fullWidth,
  align = 'center',
  className,
  onSearch,
  ...props
}) => {
  const [locationData, setLocationData] = useState({ area: '', distance: '0' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(locationData);
  };

  const onLocationChange = (value: { area: string; distance: string }) => {
    setLocationData(value);
  };

  return (
    <Form
      name={name}
      id={id}
      className={cx(
        styles['mini-search'],
        {
          [styles['extended']]: extended,
          [styles['left-aligned']]: align === 'left',
          [styles['full-width']]: fullWidth
        },
        className
      )}
      onSubmit={handleSubmit}
      {...props}
    >
      {extended && (
        <h2 className={styles['header']}>Find your new business space</h2>
      )}
      <Label
        simulated
        className={styles['label']}
        text={
          extended
            ? 'Enter a location or property ref.'
            : 'Search for properties'
        }
      />
      <div className={styles['inputs']}>
        <PropertySearch
          id="location"
          name="location"
          className={styles['search']}
          onChange={onLocationChange}
          value={locationData}
        />
        <Button
          variant="tertiary"
          icon="search"
          type="submit"
          className={styles['button-squared']}
        >
          Search
        </Button>
      </div>
      <Link
        href={`/properties?show-adv-search=1&area=${encodeURIComponent(
          locationData.area
        )}&distance=${encodeURIComponent(locationData.distance)}`}
        className={styles['link']}
      >
        Advanced search
      </Link>
    </Form>
  );
};

MiniSearch.displayName = 'MiniSearch';

export default MiniSearch;
