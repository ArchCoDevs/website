import axios, { CancelTokenSource } from 'axios';

/**
 * Gets Endpoint Data.
 * @param source CancelTokenSource, the CancelTokenSource method from axios
 * @param dataPath string If customURL is true then this will be the full url of the API, if not then it will just be the endpoint slug (e.g. `users`)
 * @param customURL (optional) string a custom API root if the data you require is not from the usual API root
 *
 * @returns Endpoint data.
 */

/* We don't know what data type may come from the endpoint so any is acceptable here */
/* eslint-disable  @typescript-eslint/no-explicit-any */

const getEndpointData = async (
  source: CancelTokenSource,
  endpoint = '',
  customURL?: boolean
): Promise<any> => {
  const urlToFetch = customURL
    ? endpoint
    : `${process.env.NEXT_PUBLIC_API_ROOT}/${endpoint}`;
  return axios
    .get(urlToFetch, {
      cancelToken: source.token
    })
    .then((res) => res.data);
};

export default getEndpointData;
