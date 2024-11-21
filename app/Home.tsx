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
   { lat: 50.880483982408876, lng: 4.701937 },
   { lat: 50.88041089082107, lng: 4.702631204072573 },
   { lat: 50.88019953666531, lng: 4.703250180362198 },
   { lat: 50.879872823443876, lng: 4.703726853183484 },
   { lat: 50.87946615560379, lng: 4.704009567639908 },
   { lat: 50.87902360191562, lng: 4.704067687233346 },
   { lat: 50.878593119938415, lng: 4.703894913804033 },
   { lat: 50.87822135907402, lng: 4.70350997003389 },
   { lat: 50.87794860538055, lng: 4.70295457055343 },
   { lat: 50.87780441595291, lng: 4.702288901514272 },
   { lat: 50.87780441595291, lng: 4.701585098485728 },
   { lat: 50.87794860538055, lng: 4.70091942944657 },
   { lat: 50.87822135907402, lng: 4.70036402996611 },
   { lat: 50.878593119938415, lng: 4.699979086195967 },
   { lat: 50.87902360191562, lng: 4.699806312766654 },
   { lat: 50.87946615560379, lng: 4.699864432360092 },
   { lat: 50.879872823443876, lng: 4.700147146816516 },
   { lat: 50.88019953666531, lng: 4.700623819637802 },
   { lat: 50.88041089082107, lng: 4.701242795927427 },
   { lat: 50.88093364321183, lng: 4.701937 },
   { lat: 50.880881377909, lng: 4.702619205853045 },
   { lat: 50.88072761946992, lng: 4.703261764381629 },
   { lat: 50.880481303776186, lng: 4.703827332419674 },
   { lat: 50.88015674580059, lng: 4.704283041208567 },
   { lat: 50.879772807672964, lng: 4.704602406609931 },
   { lat: 50.879351802481715, lng: 4.704766868267485 },
   { lat: 50.87891819751828, lng: 4.704766868267485 },
   { lat: 50.87849719232703, lng: 4.704602406609931 },
   { lat: 50.878113254199405, lng: 4.704283041208567 },
   { lat: 50.87778869622381, lng: 4.703827332419674 },
   { lat: 50.87754238053007, lng: 4.703261764381629 },
   { lat: 50.877388622091, lng: 4.702619205853045 },
   { lat: 50.87733635678816, lng: 4.701937 },
   { lat: 50.877388622091, lng: 4.701254794146955 },
   { lat: 50.87754238053007, lng: 4.7006122356183715 },
   { lat: 50.87778869622381, lng: 4.700046667580326 },
   { lat: 50.878113254199405, lng: 4.699590958791433 },
   { lat: 50.87849719232703, lng: 4.699271593390069 },
   { lat: 50.87891819751828, lng: 4.699107131732515 },
   { lat: 50.879351802481715, lng: 4.699107131732515 },
   { lat: 50.879772807672964, lng: 4.699271593390069 },
   { lat: 50.88015674580059, lng: 4.699590958791433 },
   { lat: 50.880481303776186, lng: 4.700046667580326 },
   { lat: 50.88072761946992, lng: 4.7006122356183715 },
   { lat: 50.880881377909, lng: 4.701254794146955 },
   { lat: 50.8813833040148, lng: 4.701937 },
   { lat: 50.88134010348358, lng: 4.702632168450152 },
   { lat: 50.881212162062134, lng: 4.703300621966619 },
   { lat: 50.88100439646752, lng: 4.703916672255637 },
   { lat: 50.88072479101503, lng: 4.704456644850084 },
   { lat: 50.8803840907854, lng: 4.704899788905975 },
   { lat: 50.87999538869738, lng: 4.705229074645762 },
   { lat: 50.879573622354236, lng: 4.705431847803127 },
   { lat: 50.879135, lng: 4.705500315919353 },
   { lat: 50.87869637764576, lng: 4.705431847803127 },
   { lat: 50.878274611302615, lng: 4.705229074645762 },
   { lat: 50.8778859092146, lng: 4.704899788905975 },
   { lat: 50.87754520898497, lng: 4.704456644850084 },
   { lat: 50.87726560353248, lng: 4.703916672255637 },
   { lat: 50.87705783793786, lng: 4.703300621966619 },
   { lat: 50.876929896516415, lng: 4.702632168450152 },
   { lat: 50.8768866959852, lng: 4.701937 },
   { lat: 50.876929896516415, lng: 4.701241831549848 },
   { lat: 50.87705783793786, lng: 4.700573378033381 },
   { lat: 50.87726560353248, lng: 4.699957327744363 },
   { lat: 50.87754520898497, lng: 4.699417355149916 },
   { lat: 50.8778859092146, lng: 4.698974211094025 },
   { lat: 50.878274611302615, lng: 4.698644925354238 },
   { lat: 50.87869637764576, lng: 4.698442152196873 },
   { lat: 50.879135, lng: 4.698373684080647 },
   { lat: 50.879573622354236, lng: 4.698442152196873 },
   { lat: 50.87999538869738, lng: 4.698644925354238 },
   { lat: 50.8803840907854, lng: 4.698974211094025 },
   { lat: 50.88072479101503, lng: 4.699417355149916 },
   { lat: 50.88100439646752, lng: 4.699957327744363 },
   { lat: 50.881212162062134, lng: 4.700573378033381 },
   { lat: 50.88134010348358, lng: 4.701241831549848 },
   { lat: 50.881832964817754, lng: 4.701937 },
   { lat: 50.881796168094176, lng: 4.702640803028544 },
    
    // Add more points as needed to cover the area
  ];

  useEffect(() => {
    if (!apiIsLoaded) {
      console.log('Google Maps API is still loading...');
      return;
    }

    if (!map || !placesLib) {
      console.error('Map or Places library is not initialized.');
      return;
    }

    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);

      const service = new placesLib.PlacesService(map);
      const allRestaurants: any[] = [];

      for (const coord of coordinatesList) {
        const request = {
          location: new google.maps.LatLng(coord.lat, coord.lng),
          radius: 50, // Adjust the radius as needed
          type: 'restaurant',
        };

        await new Promise<void>((resolve) => {
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

              // Avoid duplicates based on place_id
              fetchedRestaurants.forEach((restaurant) => {
                if (!allRestaurants.some((r) => r.place_id === restaurant.place_id)) {
                  allRestaurants.push(restaurant);
                }
              });
            } else {
              console.warn(`Failed to fetch restaurants for location: ${coord.lat},${coord.lng}`);
            }
            resolve();
          });
        });
      }

      setRestaurants(allRestaurants);
      setLoading(false);
    };

    fetchRestaurants().catch((err) => {
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
