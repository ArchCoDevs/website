import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import InputFactory from 'components/factories/input-factory';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Types */
import ComponentStatuses from 'lib/types/component-statuses';

interface Props {
  /**
   * The id of the input
   */
  id: string;
  /** The name of the input */
  name: string;
  /**
   * The state of the input (not providing a value or setting the value to 'default' will all return a default state)
   * @default 'default'
   */
  status?: ComponentStatuses;
  /**
   * The class name to apply to the input
   */
  className?: string;
  /**
   * Initial value for the component
   */
  value: {
    area: string;
    distance: string;
  };
  /**
   * Handler to call when the input values change
   */
  onChange: (value: { area: string; distance: string }) => void;
  /**
   * If the input is required or not
   * @default false
   */
  required?: boolean;
}

const cx = classNames.bind(styles);

const distances = [
  { label: '+ 0 miles', value: 0 },
  { label: '+ 1/4 mile', value: 0.25 },
  { label: '+ 1/2 mile', value: 0.5 },
  { label: '+ 1 mile', value: 1 },
  { label: '+ 3 miles', value: 3 },
  { label: '+ 5 miles', value: 5 },
  { label: '+ 10 miles', value: 10 },
  { label: '+ 15 miles', value: 15 },
  { label: '+ 20 miles', value: 20 },
  { label: '+ 25 miles', value: 25 },
  { label: '+ 50 miles', value: 50 }
];

export const PropertySearch = forwardRef<HTMLInputElement, Props>(
  (
    { id, name, value, onChange, className, required, ...props }: Props,
    ref
  ) => {
    const [values, setValues] = useState(value);

    useEffect(() => {
      setValues(value);
    }, [value]);

    const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedValues = { ...values, area: e.target.value };
      setValues(updatedValues);
      onChange(updatedValues);
    };

    const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedValues = { ...values, distance: e.target.value };
      setValues(updatedValues);
      onChange(updatedValues);
    };

    return (
      <div className={cx(styles['property-search'], className)} ref={ref}>
        <div className={styles['input-container']}>
          <InputFactory
            id={id}
            name={`${name}.area`}
            variant="location-autocomplete"
            label="Area"
            hideLabel
            className={cx(styles['input'], className)}
            placeholder="'London' or 'E1 1BY'"
            value={values.area}
            onChange={handleAreaChange}
            required={required}
            {...props}
          />
          <InputFactory
            id="distance"
            name={`${name}.distance`}
            variant="select"
            label="Distance"
            hideLabel
            options={distances}
            className={cx(styles['select'], className)}
            value={values.distance}
            onChange={handleDistanceChange}
            {...props}
          />
        </div>
      </div>
    );
  }
);
PropertySearch.displayName = 'PropertySearch';
export default PropertySearch;
