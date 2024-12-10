"use client";
import React, { useEffect, useState } from "react";
import {
  Map,
  useMap,
  useMapsLibrary,
  useApiIsLoaded,
} from "@vis.gl/react-google-maps";
import { populateRestaurantsTable } from "./populateRestaurantsTable";

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const map = useMap();
  const placesLib = useMapsLibrary("places");
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
    if (restaurants.length > 0) return;

    console.log(restaurants);

    if (!apiIsLoaded) {
      console.log("Google Maps API is still loading...");
      return;
    }

    if (!map || !placesLib) {
      console.error("Map or Places library is not initialized.");
      return;
    }

    const fetchPlaces = async () => {
      //const service = new placesLib.PlacesService(map);
      const allRestaurants: any[] = [];

      for (const coord of coordinatesList) {
        //console.log(coord);
        const request = {
          fields: [
            "id", //string
            "displayName", //object (LocalizedText) The localized name of the place, suitable as a short human-readable description. For example, "Google Sydney", "Starbucks", "Pyrmont", etc.
            //'location', //position of this place lat lng
            "businessStatus", //enum (BusinessStatus) The business status for the place.
            "primaryType", //string The primary type of the given result. This type must one of the Places API supported types. For example, "restaurant", "cafe", "airport", etc. A place can only have a single primary type. For the complete list of possible values, see Table A and Table B at https://developers.google.com/maps/documentation/places/web-service/place-types
            "primaryTypeDisplayName", //object (LocalizedText) The display name of the primary type, localized to the request language if applicable. For the complete list of possible values, see Table A and Table B at https://developers.google.com/maps/documentation/places/web-service/place-types
            "regularOpeningHours", //object (OpeningHours) The regular hours of operation. Note that if a place is always open (24 hours), the close field will not be set. Clients can rely on always open (24 hours) being represented as an [open][google.foo.OpeningHours.Period.open] period containing [day][google.foo.Point.day] with value 0, [hour][google.foo.Point.hour] with value 0, and [minute][google.foo.Point.minute] with value 0.
            "formattedAddress", // string A full, human-readable address for this place.
            //'viewport', //if we want a google map to be displayed for the restaurant
            "websiteURI", //string The authoritative website for this place, e.g. a business' homepage. Note that for places that are part of a chain (e.g. an IKEA store), this will usually be the website for the individual store, not the overall chain.
            "nationalPhoneNumber", //string A human-readable phone number for the place, in national format.
            "priceLevel", //enum (PriceLevel) Price level of the place.
            "photos", //Information (including references) about photos of this place. A maximum of 10 photos can be returned.
            "isReservable", //boolean  Specifies if the place supports reservations.
            "servesBeer", //boolean
            "servesWine", //boolean
            "servesVegetarianFood", //boolean
            "hasDineIn", //boolean
            "hasOutdoorSeating", //boolean
            "hasLiveMusic", //boolean
            "servesCocktails", //boolean
            "servesDessert", //boolean
            "servesCoffee", //boolean
            "isGoodForGroups", //boolean
            "isGoodForWatchingSports", //boolean
            "googleMapsURI", //string link to google maps for directions
          ],
          locationRestriction: {
            center: new google.maps.LatLng(coord.lat, coord.lng),
            radius: 50,
          },
          includedPrimaryTypes: ["restaurant"],
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
            console.log("no results");
          }
        } catch (error) {
          console.error("Error fetching places:", error);
        }

        await setTimeout(() => {}, 1000);
      }

      console.log(allRestaurants);
      setRestaurants(allRestaurants); // this is just to do a front end to verify the fetched values from the api.
      console.log("THE RESTAURANTS LENGHT DELE", allRestaurants.length);
      //populateRestaurantsTable(allRestaurants);
      deleteRestaurantsWithHighId();
      setLoading(false);
    };

    fetchPlaces().catch((err) => {
      console.error("Error fetching restaurants:", err);
      setError("Failed to fetch restaurants. Please try again later.");
      setLoading(false);
    });
  }, [apiIsLoaded, placesLib]);

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
                <h3 className="font-semibold text-xl mb-2">
                  {restaurant.displayName}
                </h3>
                <p>
                  <strong>Business Status:</strong> {restaurant.businessStatus}
                </p>
                <p>
                  <strong>Primary Type:</strong> {restaurant.primaryType}
                </p>
                <p>
                  <strong>Primary Type Display Name:</strong>{" "}
                  {restaurant.primaryTypeDisplayName}
                </p>
                <p>
                  <strong>Formatted Address:</strong>{" "}
                  {restaurant.formattedAddress}
                </p>
                <p>
                  <strong>Phone Number:</strong>{" "}
                  {restaurant.nationalPhoneNumber}
                </p>
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
function deleteRestaurantsWithHighId() {
  throw new Error("Function not implemented.");
}
