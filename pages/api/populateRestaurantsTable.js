import supabase from '../../utils/supabaseClient'; // Ensure this points to your Supabase instance

export async function populateRestaurantsTable(restaurants) {
  // Transform restaurant data to match the database schema
  const transformedRestaurants = restaurants.map((restaurant) => ({
    google_id: restaurant.id, // Store the Google API's unique ID (not as primary key)
    name: restaurant.displayName,
    //location_lat: restaurant.location.latitude,
    //location_lng: restaurant.location.longitude,
    business_status: restaurant.businessStatus,
    primary_type: restaurant.primaryType,
    primary_type_display_name: restaurant.primaryTypeDisplayName,
    formatted_address: restaurant.formattedAddress,
    website_URI: restaurant.websiteURI,
    national_phone_number: restaurant.nationalPhoneNumber,
    price_level: restaurant.priceLevel,
    soft_constraints: [
      restaurant.servesBeer,
      restaurant.servesWine,
      restaurant.servesCocktails,
      restaurant.servesCoffee,
      restaurant.servesDessert,
      restaurant.hasOutdoorSeating,
      restaurant.hasLiveMusic,
      restaurant.isGoodForGroups,
      restaurant.isGoodForWatchingSports,
    ]
      .map((value) => (value ? "1" : "0"))
      .join(""),
    hard_constraints: `${restaurant.servesVegetarianFood}`,
    google_maps_URI: restaurant.googleMapsURI,
  }));

  console.log("Transformed Restaurants Payload:", transformedRestaurants); // For testing purposes

  // Bulk insert into Supabase database
  const { data: insertedRestaurants, error } = await supabase
    .from('restaurants')
    .insert(transformedRestaurants)
    .select('*');

  if (error) {
    console.error('Error inserting restaurants:', error);
    return false; // Indicate failure
  }

  if (!insertedRestaurants) {
    console.error('No data returned after insertion');
    return false; // Handle cases where Supabase doesn't return data
  }

  console.log('Restaurants successfully inserted');

  // Loop through restaurants for related table insertions
  for (const restaurant of restaurants) {
    const matchingRestaurant = insertedRestaurants.find(
      (r) => r.google_id === restaurant.id
    );
    if (!matchingRestaurant) continue; // Skip if no matching restaurant found

    const { id: restaurant_id } = matchingRestaurant;

    // Insert opening hours into `restaurants_times`
    const periods = restaurant.regularOpeningHours?.periods || [];
    if (Array.isArray(periods) && periods.length > 0) {
      const timeEntries = periods.map((period) => ({
        restaurant_id,
        day: period.open.day ,
        open_hour: period.open.hour ,
        open_minute: period.open.minute ,
        close_hour: period.close.hour ,
        close_minute: period.close.minute ,
      }));

      const { error: timesError } = await supabase
        .from('restaurants_times')
        .insert(timeEntries);

      if (timesError) {
        console.error(
          `Error inserting time entries for restaurant ${restaurant_id}:`,
          timesError
        );
      } else {
        console.log(`Time entries inserted for restaurant ${restaurant_id}`);
      }
    }

    // Insert photos into `restaurants_photos`
    const photos = restaurant.photos || [];
    if (Array.isArray(photos) && photos.length > 0) {
      const photoEntries = photos.map((photo) => ({
        restaurant_id,
        photo: photo.flagContentURI || null, // Store the URL
      }));

      const { error: photosError } = await supabase
        .from('restaurants_photos')
        .insert(photoEntries);

      if (photosError) {
        console.error(
          `Error inserting photos for restaurant ${restaurant_id}:`,
          photosError
        );
      } else {
        console.log(`Photos inserted for restaurant ${restaurant_id}`);
      }
    }
  }

  return true; // Indicate success
}
