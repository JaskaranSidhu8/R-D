'use client';
import React, { useEffect, useState } from 'react';
import { Map, useMap, useMapsLibrary, useApiIsLoaded } from '@vis.gl/react-google-maps';

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const apiIsLoaded = useApiIsLoaded();
   
  const coordinatesList = [
    { lat: 50.879135, lng: 4.701937 },
    { lat: 50.879584660802955, lng: 4.701937 },
    { lat: 50.87941535892494, lng: 4.702494182513546 },
    { lat: 50.87903494105816, lng: 4.70263179522994 },
    { lat: 50.87872986961541, lng: 4.70224621296695 },
    { lat: 50.87872986961541, lng: 4.7016277870330505 },
    { lat: 50.87903494105816, lng: 4.70124220477006 },
    { lat: 50.87941535892494, lng: 4.701379817486454 },
    { lat: 50.88003432160592, lng: 4.701937 },
    { lat: 50.87993130973496, lng: 4.702599382190814 },
    { lat: 50.87964587290029, lng: 4.703110020604283 },
    { lat: 50.879243401240856, lng: 4.703351934133742 },
    { lat: 50.87881609616352, lng: 4.703269703304966 },
    { lat: 50.878461848111904, lng: 4.702882166209837 },
    { lat: 50.8782618110455, lng: 4.702278102926522 },
    { lat: 50.8782618110455, lng: 4.701595897073478 },
    { lat: 50.878461848111904, lng: 4.700991833790163 },
    { lat: 50.87881609616352, lng: 4.700604296695034 },
    { lat: 50.879243401240856, lng: 4.700522065866258 },
    { lat: 50.87964587290029, lng: 4.700763979395717 },
    { lat: 50.87993130973496, lng: 4.701274617809186 },
  
    // Add more points as needed to cover the area
  ];

    useEffect(() => {

      console.log(restaurants);

      if(restaurants.length > 0)
        return;

      if (!apiIsLoaded) {
        console.log('Google Maps API is still loading...');
        return;
      }

      if (!map || !placesLib) {
        console.error('Map or Places library is not initialized.');
        return;
      }

      const fetchPlaces = async () => {
        const service = new placesLib.PlacesService(map);
        const allRestaurants: any[] = [];

        for (const coord of coordinatesList) {
          console.log(coord);
          const request = {
            fields: [
              'id',
              'displayName',
              'location',
              'businessStatus',
              'primaryType',
              'primaryTypeDisplayName',
              'rating',
              'userRatingCount',
            ],
            locationRestriction: {
              center: new google.maps.LatLng(coord.lat, coord.lng),
              radius: 50,
            },
            includedPrimaryTypes: ['restaurant'],
            maxResultCount: 20,
          };

          try {
            const { places } = await placesLib.Place.searchNearby(request);
            if (places.length) {
              places.forEach((place) => {
                if (!allRestaurants.some((r) => r.id === place.id)) {
                  allRestaurants.push(place);
                }
              });
            } else {
              console.log('no results');
            }
          } catch (error) {
            console.error('Error fetching places:', error);
          }
        }

        //console.log(allRestaurants);
        setRestaurants(allRestaurants);
        setLoading(false);
      };

      fetchPlaces().catch((err) => {
        console.error('Error fetching restaurants:', err);
        setError('Failed to fetch restaurants. Please try again later.');
        setLoading(false);
      });
    }, [apiIsLoaded, map, placesLib, coordinatesList]);

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Restaurant Finder</h1>
      <p className="text-lg mb-6">Find the best restaurants near you!</p>

      <Map zoom={3} defaultCenter={{ lat: 22.54992, lng: 0 }} />

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
                key={restaurant.id}
                className="p-4 border rounded shadow-md bg-white hover:shadow-lg"
              >
                <h3 className="font-semibold text-xl mb-2">{restaurant.displayName}</h3>
                <p>businessStatus: {restaurant.businessStatus}</p>
                <p>primaryType: {restaurant.primaryType}</p>
                <p>rating: {restaurant.rating}</p>
                <p>userRatingCount: {restaurant.userRatingCount}</p>
                <p>primaryTypeDisplayName: {restaurant.primaryTypeDisplayName}</p>
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
