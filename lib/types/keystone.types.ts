export interface RentalSpaceData {
  search_string: string;
  latitude: number;
  longitude: number;
  rental_space_model_list: RentalSpaceModel[];
  current_page: number;
  total_pages: number;
}

export interface RentalSpaceModel {
  address: string;
  use: string;
  size_sq_ft?: number;
  size_sq_mt?: number;
  price_title: string;
  latitude: number;
  longitude: number;
  reference: string;
  thumbnail: Thumbnail;
  distance: number;
  postcode: string;
  rental_space_id: number;
  is_flex_lease: boolean;
  price: number;
  date_added?: string;
  favourite: boolean;
}

interface Thumbnail {
  url: string;
  alt_text: string;
}

export interface FavouritesResponse {
  display_message: string;
  rental_space_model_list: RentalSpaceModel[];
  current_page: number;
  total_pages: number;
}
