import dotenv from 'dotenv';
dotenv.config(); // Loads the environment variables

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";

// Define the interface for restaurant and API response
interface Restaurant {
  id: string;
  name: string;
  place_id: string;
  price_level?: number;
  rating?: number;
  user_ratings_total?: number;
  location: {
    lat: number;
    lng: number;
  };
  tags: string[];
  icon_url?: string;
  photos?: string[];
  opening_hours?: string[];
  serves_beer?: boolean;
  serves_wine?: boolean;
  serves_vegetarian_food?: boolean;
  takeout?: boolean;
  serves_breakfast?: boolean;
  serves_brunch?: boolean;
  serves_dinner?: boolean;
  serves_lunch?: boolean;
}

interface Geometry {
  location: {
    lat: number;
    lng: number;
  };
}

interface PlaceDetails {
  place_id: string;
  name: string;
  types: string[];
  formatted_address?: string;
  formatted_phone_number?: string;
  geometry: Geometry;
  price_level?: number;
  rating?: number;
  icon?: string;
  photos?: Array<{ photo_reference: string }>;
  opening_hours?: {
    weekday_text: string[];
  };
  serves_beer?: boolean;
  serves_wine?: boolean;
  serves_vegetarian_food?: boolean;
  takeout?: boolean;
  serves_breakfast?: boolean;
  serves_brunch?: boolean;
  serves_dinner?: boolean;
  serves_lunch?: boolean;
}

interface NearbySearchResponse {
  results: Array<{
    id: string;
    name: string;
    place_id: string;
    price_level?: number;
    rating?: number;
    user_ratings_total?: number;
    geometry: Geometry;
    types: string[];
  }>;
}
async function fetchRestaurantDetails(place_id: string): Promise<Partial<Restaurant> | null> {
  try {
    const url = `${DETAILS_URL}?place_id=${place_id}&key=${GOOGLE_API_KEY}&fields=place_id,name,types,formatted_address,formatted_phone_number,geometry,price_level,rating,icon,photos,opening_hours,serves_beer,serves_wine,serves_vegetarian_food,takeout,serves_breakfast,serves_brunch,serves_dinner,serves_lunch`;

    const response = await fetch(url);
    const detail = await response.json();

    if (!detail.result) return null;

    return {
      place_id: detail.result.place_id,
      name: detail.result.name,
      price_level: detail.result.price_level,
      rating: detail.result.rating,
      location: {
        lat: detail.result.geometry.location.lat,
        lng: detail.result.geometry.location.lng,
      },
      tags: detail.result.types || [],
      icon_url: detail.result.icon,
      photos: detail.result.photos?.map((photo: any) => photo.photo_reference),
      opening_hours: detail.result.opening_hours?.weekday_text,
      serves_beer: detail.result.serves_beer,
      serves_wine: detail.result.serves_wine,
      serves_vegetarian_food: detail.result.serves_vegetarian_food,
      takeout: detail.result.takeout,
      serves_breakfast: detail.result.serves_breakfast,
      serves_brunch: detail.result.serves_brunch,
      serves_dinner: detail.result.serves_dinner,
      serves_lunch: detail.result.serves_lunch,
    };
  } catch (error) {
    console.error(`Error fetching details for place_id ${place_id}:`, error);
    return null;
  }
}

async function fetchRestaurants(
  latitude: number,
  longitude: number,
  radius: number = 5000,
  type: string = "restaurant"
): Promise<Restaurant[]> {
  try {
    const url = `${BASE_URL}?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();

    const places = data.results;

    if (!places || places.length === 0) {
      console.log('No restaurants found in the response.');
      return [];
    }

    const restaurants: Restaurant[] = await Promise.all(
      places.map(async (place: any) => {
        const basicInfo: Restaurant = {
          id: place.id,
          name: place.name,
          place_id: place.place_id,
          price_level: place.price_level,
          rating: place.rating,
          user_ratings_total: place.user_ratings_total,
          location: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          },
          tags: place.types || [],
        };

        const detailedInfo = await fetchRestaurantDetails(place.place_id);
        return { ...basicInfo, ...detailedInfo };
      })
    );

    console.log('Fetched Restaurants:', restaurants);
    return restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}

export default fetchRestaurants;
