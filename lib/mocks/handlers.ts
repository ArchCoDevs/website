import { http, HttpResponse, passthrough } from 'msw';
import searchResults from './keystone/search-results.json';
import homepageData from './sanity/homepage.json';

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({
      id: '2342432432',
      name: 'Josdfsdfsdhn Doe',
      email: 'john@example.com'
    });
  }),
  http.get(
    'https://tcnivow2.api.sanity.io/v2023-05-03/data/query/production',
    async () => {
      return HttpResponse.json({ result: homepageData });
    }
  ),

  http.get('/api/proxy/User/GetUserDetails', async () => {
    return HttpResponse.json({
      firstname: 'Myfirst',
      lastname: 'first name My Last Name',
      phone: '07795112211',
      username: 'abc14545@example.com'
    });
  }),
  http.get(
    '/api/proxy/User/GetFavourites?PageSize=999999&PageNumber=1&OrderBy=date_added&OrderAscending=false',
    async () => {
      return HttpResponse.json({
        display_message: '',
        rental_space_model_list: searchResults.rental_space_model_list
          .slice(0, 6)
          .map((item) => ({ ...item, favourite: true })),
        current_page: 0,
        total_pages: 0
      });
    }
  ),
  // Add a pass-through handler for Google Maps API
  http.get('https://maps.googleapis.com/*', async () => {
    return passthrough();
  })
];
