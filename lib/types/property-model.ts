import { TPropertyTag } from 'components/data-display/property-tag';
/**
 * The base property type
 * This is the type that is used to represent the basic information about a property
 */
export interface PropertyModel {
  /**
   * The price per month for the property
   */
  price: number;
  /**
   * The unique identifier for the property
   */
  rental_space_id: number;
  /**
   * The address of the property
   */
  address: string;
  /**
   * The type of the property
   */
  use: string;
  /**
   * The size of the property in square feet
   */
  size_sq_ft: number;
  /**
   * The size of the property in square meters
   */
  size_sq_mt: number;
  /**
   * The property reference string
   */
  reference: string;
  /**
   * Whether the property is saved or not
   */
  favourite: boolean;
  /**
   * The tag for the property
   * Optional
   */
  tag?: TPropertyTag;
  /**
   * The location of the property as a LatLngLiteral
   * split into latitude and longitude
   */
  latitude: google.maps.LatLngLiteral['lat'];
  longitude: google.maps.LatLngLiteral['lng'];

  thumbnail: {
    url: string;
    alt_text: string;
  };
}
