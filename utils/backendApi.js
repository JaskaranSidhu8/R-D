import { supabase } from './supabaseClient';

export function filterRestaurantsByHardConstraints(groupUsers, restaurants) {
  console.log("Filtering restaurants. GroupUsers:", groupUsers);
  console.log("Initial restaurants list:", restaurants);

  
  const glutenRequired = groupUsers.some(user => {
    if (!user.users || !user.users.hardconstraints) {
      console.error("Undefined or missing hardconstraints for user:", user);
      return false; 
    }
    return user.users.hardconstraints[0] === '1';
  });

  console.log("Gluten-free requirement:", glutenRequired);

 
  return restaurants.filter(restaurant => {
    if (!restaurant.hardconstraints) {
      console.error("Undefined or missing hardconstraints for restaurant:", restaurant);
      return false; 
    }
    const isGlutenFree = restaurant.hardconstraints[0] === '1';
    return !glutenRequired || isGlutenFree;
  });
}


export async function fetchGroupPreferences(groupId) {
  const { data: groupUsers, error } = await supabase
    .from('group_users')
    .select(`
      user_id,
      softconstraints,
      users (
        hardconstraints
      )
    `)
    .eq('group_id', groupId);

  if (error) {
    throw new Error(`Error fetching group users: ${error.message}`);
  }

  return groupUsers;
}







export async function fetchRestaurants() {
  const { data: restaurants, error } = await supabase
    .from('restaurants')
    .select('id, name, softconstraints, hardconstraints');

  if (error) {
    throw new Error(`Error fetching restaurants: ${error.message}`);
  }

  return restaurants;
}

export function combinePreferences(groupUsers, weights = Array(10).fill(1)) {
    const numUsers = groupUsers.length;
    const totalPreferences = Array(10).fill(0);
  
    groupUsers.forEach(({ softconstraints }) => {
      console.log('softconstraints:', softconstraints); 
      const prefs = softconstraints.split('').map(Number);
      prefs.forEach((pref, index) => {
        totalPreferences[index] += pref * weights[index];
      });
    });
  
    
    return totalPreferences.map(total => total / numUsers);
  }
  
  
  
  export function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  
    return dotProduct / (magA * magB);
  }