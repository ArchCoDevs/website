import { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import {
  Map as GMap,
  MapCameraChangedEvent,
  useMap
} from '@vis.gl/react-google-maps';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/* Import Child Components */
import { Markers } from './components/markers';

/* Types */
import { PropertyModel } from 'lib/types/property-model';
import ErrorBoundary from 'components/feedback/error-boundary';
import calculateMapCenter from 'lib/helpers/calculate-map-center';

type MapDetails = {
  center: google.maps.LatLngLiteral;
  bounds: google.maps.LatLngBoundsLiteral;
  zoom: number;
  heading: number;
  tilt: number;
};

/* Prop Types */
export interface Props extends React.ComponentProps<'div'> {
  isStatic?: boolean;
  properties: PropertyModel[];
  selectedProperty?: PropertyModel;
  onSelectionChange?: (poi: PropertyModel) => void;
  onMapUpdate?: (map: MapDetails) => void;
  disableAutoBounds?: boolean;
}

export const Map: React.FC<Props> = ({
  isStatic = false,
  properties,
  selectedProperty,
  onSelectionChange,
  onMapUpdate,
  className,
  disableAutoBounds = false
}: Props) => {
  const map = useMap();
  const [error, setError] = useState<boolean>(false);

  // Calculate map settings based on properties
  const mapSettings = useMemo(() => {
    if (disableAutoBounds) {
      return {
        ...calculateMapCenter(properties),
        zoom: 14
      };
    }
    return calculateMapCenter(properties);
  }, [properties, disableAutoBounds]);

  useEffect(() => {
    if (disableAutoBounds) {
      return;
    }

    if (!map) {
      setError(true);
      return;
    }

    map.setOptions({
      clickableIcons: !isStatic,
      draggable: !isStatic,
      zoomControl: !isStatic,
      scrollwheel: !isStatic,
      disableDoubleClickZoom: isStatic,
      disableDefaultUI: isStatic
    });

    // Set the map bounds based on the calculated settings
    if (mapSettings.bounds) {
      map.fitBounds(mapSettings.bounds);
    }
  }, [map, isStatic, mapSettings, disableAutoBounds]);

  useEffect(() => {
    if (!mapSettings.center.lat || !mapSettings.center.lng) {
      setError(true);
      return;
    }
    setError(false);
  }, [mapSettings.center]);

  return (
    <div className={cx(styles.map, className)}>
      <ErrorBoundary
        message="Failed to load map"
        forceError={error}
        className={styles['map-error']}
      >
        <GMap
          defaultZoom={mapSettings.zoom}
          defaultCenter={mapSettings.center}
          mapTypeControl={false}
          streetViewControl={false}
          mapId={'map'}
          onCameraChanged={(ev: MapCameraChangedEvent) => {
            if (onMapUpdate) {
              onMapUpdate(ev.detail);
            }
          }}
        >
          <Markers
            properties={properties}
            onPinClick={isStatic ? undefined : onSelectionChange}
            selectedProperty={selectedProperty}
          />
        </GMap>
      </ErrorBoundary>
    </div>
  );
};

Map.displayName = 'Map';

export default Map;
