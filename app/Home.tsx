'use client';
import React, { useEffect, useState } from 'react';
import { Map, useMap, useMapsLibrary, useApiIsLoaded } from '@vis.gl/react-google-maps';

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const apiIsLoaded = useApiIsLoaded();

  useEffect(() => {
    if (!apiIsLoaded) {
      console.log('Google Maps API is still loading...');
      return;
    }

    if (!map || !placesLib) {
      console.error('Map or Places library is not initialized.');
      return;
    }

    setLoading(true);

    const service = new placesLib.PlacesService(map);

    const request = {
      location: new google.maps.LatLng(50.8794, 4.7009),
      radius: 500,
      type: 'restaurant',
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const fetchedRestaurants = results.map((place) => ({
          name: place.name,
          place_id: place.place_id,
          price_level: place.price_level ?? 'N/A',
          rating: place.rating ?? 'N/A',
          location: {
            lat: place.geometry?.location?.lat() ?? 0,
            lng: place.geometry?.location?.lng() ?? 0,
          },
          tags: place.types || [],
          icon_url: place.icon,
          photos: place.photos?.map((photo) => photo.getUrl({ maxWidth: 400 })),
          opening_hours: place.opening_hours?.weekday_text,
        }));
        setRestaurants(fetchedRestaurants);
      } else {
        setError('Failed to fetch restaurants. Please try again later.');
      }
      setLoading(false);
    });
  }, [apiIsLoaded, map, placesLib]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Restaurant Finder</h1>
      <p className="text-lg mb-6">Find the best restaurants near you!</p>

      <Map
        zoom={3}
        defaultCenter={{lat: 22.54992, lng: 0}}
      />

      {/* Loading state */}
      {loading && <p className="text-blue-600">Loading restaurants...</p>}

      {/* Error message */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Restaurants List */}
      <div className="w-3/4 mt-6">
        {restaurants.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {restaurants.map((restaurant) => (
              <li
                key={restaurant.place_id}
                className="p-4 border rounded shadow-md bg-white hover:shadow-lg"
              >
                <h3 className="font-semibold text-xl mb-2">{restaurant.name}</h3>
                <p>Rating: {restaurant.rating}</p>
                <p>Price Level: {restaurant.price_level}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
