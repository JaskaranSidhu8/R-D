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
        //const service = new placesLib.PlacesService(map);
        const allRestaurants: any[] = [];

        for (const coord of coordinatesList) {
          //console.log(coord);
          const request = {
            fields: [
              'id', //string
              'displayName', //object (LocalizedText) The localized name of the place, suitable as a short human-readable description. For example, "Google Sydney", "Starbucks", "Pyrmont", etc.
              'location', //position of this place lat lng
              'businessStatus', //enum (BusinessStatus) The business status for the place.
              'primaryType', //string The primary type of the given result. This type must one of the Places API supported types. For example, "restaurant", "cafe", "airport", etc. A place can only have a single primary type. For the complete list of possible values, see Table A and Table B at https://developers.google.com/maps/documentation/places/web-service/place-types
              'primaryTypeDisplayName', //object (LocalizedText) The display name of the primary type, localized to the request language if applicable. For the complete list of possible values, see Table A and Table B at https://developers.google.com/maps/documentation/places/web-service/place-types             
              'regularOpeningHours', //object (OpeningHours) The regular hours of operation. Note that if a place is always open (24 hours), the close field will not be set. Clients can rely on always open (24 hours) being represented as an [open][google.foo.OpeningHours.Period.open] period containing [day][google.foo.Point.day] with value 0, [hour][google.foo.Point.hour] with value 0, and [minute][google.foo.Point.minute] with value 0.
              'formattedAddress', // string A full, human-readable address for this place.
              'viewport', //if we want a google map to be displayed for the restaurant
              'websiteURI', //string The authoritative website for this place, e.g. a business' homepage. Note that for places that are part of a chain (e.g. an IKEA store), this will usually be the website for the individual store, not the overall chain.
              'nationalPhoneNumber', //string A human-readable phone number for the place, in national format.
              'priceLevel', //enum (PriceLevel) Price level of the place.
              'svgIconMaskURI', //string A truncated URL to an icon mask. User can access different icon type by appending type suffix to the end (eg, ".svg" or ".png").
              'photos', //Information (including references) about photos of this place. A maximum of 10 photos can be returned.
              'isReservable', //boolean  Specifies if the place supports reservations.
              'servesBeer', //boolean
              'servesWine', //boolean
              'servesVegetarianFood', //boolean
              'hasDineIn', //boolean
              'hasOutdoorSeating', //boolean
              'hasLiveMusic', //boolean
              'servesCocktails', //boolean
              'servesDessert', //boolean
              'servesCoffee', //boolean
              'isGoodForGroups', //boolean
              'isGoodForWatchingSports', //boolean 
              'googleMapsURI',   //string link to google maps for directions
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

        console.log(allRestaurants);
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
                <p><strong>Business Status:</strong> {restaurant.businessStatus}</p>
                <p><strong>Primary Type:</strong> {restaurant.primaryType}</p>
                <p><strong>Primary Type Display Name:</strong> {restaurant.primaryTypeDisplayName}</p>
                <p><strong>Formatted Address:</strong> {restaurant.formattedAddress}</p>
                <p><strong>Website:</strong> <a href={restaurant.websiteUri} target="_blank" rel="noopener noreferrer">{restaurant.websiteUri}</a></p>
                <p><strong>Phone Number:</strong> {restaurant.nationalPhoneNumber}</p>
                <p>Soft : {restaurant.softConstraint}</p>
                <p> Hard dick: {restaurant.hardConstraint}</p>
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
