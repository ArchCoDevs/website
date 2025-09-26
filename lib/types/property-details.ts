import { PropertyModel } from './property-model';
import { PropertySearchResult } from './property-search-result';

/**
 * The PropertyDetails type
 * extends the BaseProperty type to include additional details about a property
 */
export interface PropertyDetails extends PropertyModel {
  /**
   * The price per month for the property
   */
  price_per_month: number;
  /**
   * The price title
   */
  price_title: string;
  /**
   * The energy rating of the property
   * @optional
   */
  energy_rating?: string;
  /**
   * The deposit required for the property
   */
  deposit: string;
  /**
   * The business rates for the property
   */
  business_rates: number;
  /**
   * The insurance for the property
   */
  insurance: number;
  /**
   * Is a flexible lease available?
   */
  is_flex_lease?: boolean;
  /**
   * The service charge for the property
   */
  service_charge: number;
  /**
   * The URL for the property brochure
   */
  brochure_url: string;
  /**
   * A list of supporting images for the property
   */
  supporting_image_list: {
    url: string;
    alt_text: string;
  }[];
  /**
   * A list of features for the property
   */
  feature_list: string[];
  /**
   * A list of travel times to the property
   */
  travel_time_list: {
    journey_type: string;
    journey_length: string;
    location: string;
  }[];
  /**
   * A list of similar rental spaces
   */
  similar_rental_spaces: PropertySearchResult[];
  /**
   * The postcode of the property
   */
  postcode: string;

  /**
   * The What 3 Words location for the property
   */
  whatthreewords: string;
  /**
   * Is the fee a service fee?
   */
  is_service_fee: boolean;
}

export default PropertyDetails;
