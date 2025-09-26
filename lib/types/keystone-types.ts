import PropertySearchResult from './property-search-result';
export interface RentalSpaceData {
  /**
   * The search string used to generate the search results
   */
  search_string: string;
  /**
   * The latitude of the search location
   */
  latitude: number;
  /**
   * The longitude of the search location
   */
  longitude: number;
  /**
   * The returned property search results
   */
  rental_space_model_list: PropertySearchResult[];
}
