import { useState, useEffect } from 'react';

import { PropertyModel } from 'lib/types/property-model';

import Pin from './pin';

export const Markers = (props: {
  /**
   * The list of properties to display on the map
   */
  properties: PropertyModel[];
  /**
   * A pre-selected property to display on the map
   * @optional
   */
  selectedProperty?: PropertyModel;
  /**
   * Callback function to call when a pin is clicked
   */
  onPinClick?: (poi: PropertyModel) => void;
}) => {
  const [selectedProperty, setSelectedProperty] = useState<
    PropertyModel | undefined
  >(props.selectedProperty);

  useEffect(() => {
    setSelectedProperty(props.selectedProperty);
  }, [props.selectedProperty]);

  const handlePinClick = (poi: PropertyModel) => {
    if (props.onPinClick) {
      setSelectedProperty(poi);
      props.onPinClick(poi);
    }
  };

  return (
    <>
      {props.properties?.map((poi: PropertyModel) => {
        if (!poi.latitude || !poi.longitude) {
          return null;
        }
        return (
          <Pin
            key={poi.reference}
            property={poi}
            isSelected={selectedProperty?.reference === poi.reference}
            onPinClick={props.onPinClick ? handlePinClick : undefined}
          />
        );
      })}
    </>
  );
};
