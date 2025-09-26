import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { PropertyModel } from 'lib/types/property-model';
import Icon from 'components/flourishes/icon';
import classNames from 'classnames';

import styles from '../styles.module.scss';

const cx = classNames.bind(styles);

export const Pin = (props: {
  /**
   * The list of properties to display on the map
   */
  property: PropertyModel;
  /**
   * Is the pin selected
   * @default false
   */
  isSelected: boolean;
  /**
   * Callback function to call when a pin is clicked
   */
  onPinClick?: (poi: PropertyModel) => void;
}) => {
  const { property, isSelected = false, onPinClick } = props;

  const location = {
    lat: property.latitude,
    lng: property.longitude
  };

  if (!location.lat || !location.lng) {
    return null;
  }

  return (
    <AdvancedMarker
      key={property.reference}
      position={location}
      title={property.address}
      onClick={() => {
        onPinClick && onPinClick(property);
      }}
    >
      <div
        className={styles['pin-container']}
        aria-selected={isSelected ? true : undefined}
      >
        {isSelected && <Icon use="house" className={styles['house']} />}
        <Icon
          use="pin"
          className={cx(
            styles['pin'],
            isSelected && styles['selected'],
            onPinClick && styles['clickable']
          )}
        />
        <Icon use="pin" className={styles['pin-shadow']} />
      </div>
    </AdvancedMarker>
  );
};

export default Pin;
