import { PropertyModel } from './property-model';
/**
 * The PropertySearchResult
 * This is the type that is used to represent the search results for a property
 */
export interface PropertySearchResult extends PropertyModel {
  /**
   * The price title for the property
   */
  price_title: string;
  /**
   * The image URL for the property
   */
  thumbnail: {
    url: string;
    alt_text: string;
  };
}

export default PropertySearchResult;
