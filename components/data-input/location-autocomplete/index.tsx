import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import components */
import InputComponent from 'lib/types/input-component';
import changeCase from 'lib/helpers/change-case';
import fakeEvent from 'lib/helpers/fake-event';

/* Prop Types */

/* Import helpers */

/** Import custom types */

interface Props extends InputComponent {}

const cx = classNames.bind(styles);

const formatFullAddress = (address?: string) => {
  let displayAddress = address ?? '';

  // Remove the ', UK' from the end of the string
  displayAddress = displayAddress.replaceAll(/, UK$/g, '');

  return displayAddress;
};

/**
 * A location autocomplete which uses the Google Places API autocomplete component
 */
export const LocationAutocomplete: React.FC<Props> = ({
  className,
  onChange,
  status,
  name,
  id,
  ...props
}: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options: google.maps.places.AutocompleteOptions = {
      fields: ['formatted_address'],
      componentRestrictions: {
        country: ['gb']
      },
      types: ['geocode']
    };
    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    const listener = placeAutocomplete.addListener('place_changed', () => {
      if (placeAutocomplete.getPlace()?.formatted_address) {
        onChange &&
          onChange(
            fakeEvent(
              formatFullAddress(placeAutocomplete.getPlace().formatted_address)
            )
          );
      }
    });

    return () => {
      listener.remove();
    };
  }, [placeAutocomplete]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  return (
    <div className="autocomplete-container">
      <input
        id={id || changeCase(name, 'kebab')}
        ref={inputRef}
        data-testid={id || changeCase(name, 'kebab')}
        name={name}
        className={cx(
          styles['input'],
          styles[`type-text`],
          styles[`status-${status}`],
          className
        )}
        type="text"
        onChange={handleTextChange}
        {...props}
      />
    </div>
  );
};
