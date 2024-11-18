'use client'
import React, { useEffect, useState } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary, useApiIsLoaded } from '@vis.gl/react-google-maps';
import Link from 'next/link';

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]); // State to store the restaurant data
  const [loading, setLoading] = useState<boolean>(false); // Loading state to show while fetching data
  const [error, setError] = useState<string | null>(null); // Error state for handling API errors
  
  const map = useMap();
  const placesLib = useMapsLibrary('places'); // Load the Places library
  const apiIsLoaded = useApiIsLoaded(); // Check if API is loaded

  useEffect(() => {
    if (!apiIsLoaded || !map || !placesLib) return;

    // Start fetching restaurants when the API is loaded
    setLoading(true);
    const service = new placesLib.PlacesService(map);

    // Define search request parameters
    const request = {
      location: new google.maps.LatLng(50.8794, 4.7009), // Example coordinates (Leuven, Belgium)
      radius: 5000,
      type: 'restaurant',
    };

    // Perform nearby search
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const fetchedRestaurants = results.map((place) => ({
          // Remove id and use place_id as the unique identifier
          name: place.name,
          place_id: place.place_id,
          price_level: place.price_level,
          rating: place.rating,
          location: {
            // Use optional chaining to handle potential undefined values
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
        setError('Failed to fetch restaurants.');
      }
      setLoading(false);
    });
  }, [apiIsLoaded, map, placesLib]);

  return (
    <div className="flex items-center justify-center min-h-screen shadow-ml bg-gray-200">
      <h1 className="text-3xl text-red bg-red-900">Restaurant Finder</h1>
      <p>We are building a SaaS application to help you find restaurants.</p>
      
      {/* Loading state */}
      {loading && <p>Loading restaurants...</p>}
      
      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Display restaurants */}
      <div className="mt-4">
        {restaurants.length > 0 ? (
          <ul>
            {restaurants.map((restaurant, index) => (
              <li key={index}>
                <h3>{restaurant.name}</h3>
                <p>Rating: {restaurant.rating}</p>
                <p>Price Level: {restaurant.price_level}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No restaurants found.</p>
        )}
      </div>

      {/* Navigation link to the About Us page */}
      <Link href="/about" className="text-blue-500 mt-4">
        Go to About Us
      </Link>
    </div>
  );
};

const App: React.FC = () => (
  <APIProvider apiKey={process.env.GOOGLE_API_KEY as string}>
      <Home />
  </APIProvider>
);

export default App;
