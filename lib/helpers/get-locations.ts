import defaultPlaces from 'lib/data/places'; // Import the default data

const apiUrl = `${process.env.NEXT_PUBLIC_API_ROOT}/proxy/RentalSpace/Location`;

interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
}

export const getLocations = async (): Promise<string[]> => {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LocationData[] = await response.json();

    // Extract the 'name' property from each location object
    const locationNames = data.map((location) => location.name);

    return locationNames;
  } catch (error) {
    console.error(
      'Failed to fetch locations from API, falling back to local data:',
      error
    );
    return defaultPlaces; // Use default data as a fallback
  }
};

export default getLocations;

// To be used in components or other functions for loading placeholder data
export const getDefaultLocations = (): string[] => {
  return defaultPlaces;
};
