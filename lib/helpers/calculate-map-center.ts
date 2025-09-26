interface Property {
  latitude: number;
  longitude: number;
}

export interface MapSettings {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

function calculateZoom(maxDiffKm: number): number {
  const baseZoom = 13;
  const zoomLevel = baseZoom - Math.log2(maxDiffKm);
  return Math.min(Math.max(Math.round(zoomLevel), 1), 20);
}

export function calculateMapCenter(properties: Property[]): MapSettings {
  const propertiesWithGeo = properties.filter(
    (p) => p.latitude != null && p.longitude != null
  );

  if (propertiesWithGeo.length === 0) {
    return {
      center: { lat: 51.5074, lng: -0.1278 },
      zoom: 10,
      bounds: {
        north: 51.5074 + 0.1,
        south: 51.5074 - 0.1,
        east: -0.1278 + 0.1,
        west: -0.1278 - 0.1
      }
    }; // Default to central London with some arbitrary bounds
  }

  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  // Find the bounding box
  propertiesWithGeo.forEach((property) => {
    minLat = Math.min(minLat, property.latitude);
    maxLat = Math.max(maxLat, property.latitude);
    minLng = Math.min(minLng, property.longitude);
    maxLng = Math.max(maxLng, property.longitude);
  });

  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  const latDiff = maxLat - minLat;
  const lngDiff = maxLng - minLng;
  const maxDiff = Math.max(latDiff, lngDiff);
  const maxDiffKm = maxDiff * 111; // Convert degrees to approximate kilometers

  const zoom = calculateZoom(maxDiffKm);

  // Add a small padding to ensure pins aren't exactly at the edge
  const padding = 1.1; // 10% padding
  const adjustedMaxDiff = maxDiff * padding;

  return {
    center: { lat: centerLat, lng: centerLng },
    zoom: zoom,
    bounds: {
      north: centerLat + adjustedMaxDiff / 2,
      south: centerLat - adjustedMaxDiff / 2,
      east: centerLng + adjustedMaxDiff / 2,
      west: centerLng - adjustedMaxDiff / 2
    }
  };
}

export default calculateMapCenter;
