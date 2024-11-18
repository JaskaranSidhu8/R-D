import { supabase } from './supabaseClient';

export function filterRestaurantsByHardConstraints(groupUsers, restaurants) {
  const glutenRequired = groupUsers.some(user => user.users?.hardTags?.[0] === '1');

  return restaurants.filter(restaurant => {
    const isGlutenFree = restaurant.hardconstraints?.[0] === '1';
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
        hardTags
      )
    `)
    .eq('group_id', groupId);

  if (error) {
    console.error('Supabase query error:', error); // Supabase query failed
    throw new Error(`Error fetching group users: ${error.message}`);
  }

  if (!groupUsers || groupUsers.length === 0) {
    console.warn('No group users found for groupId:', groupId);
    return [];
  }

  console.log('Fetched groupUsers:', groupUsers); // This ensures groupUsers is valid
  return groupUsers;
}





// Fetch all restaurants with their constraints
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
      console.log('softconstraints:', softconstraints); // Debug log
      const prefs = softconstraints.split('').map(Number);
      prefs.forEach((pref, index) => {
        totalPreferences[index] += pref * weights[index];
      });
    });
  
    // Average each preference by the number of users
    return totalPreferences.map(total => total / numUsers);
  }
  
  
  
  export function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  
    return dotProduct / (magA * magB);
  }