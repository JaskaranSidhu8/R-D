import { supabase } from './supabaseClient';

export const fetchQuizImages = async () => {
  try {
    const { data, error } = await supabase.storage.from('quiz-images') // Replace with your bucket name
      .list();

    if (error) {
      throw error;
    }

    // Map the fetched data to include both name and URL
    console.log('Data from Supabase:', data); // Add this line
    const images = data.map((file) => ({
      name: file.name,
      url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/quiz-images/${file.name}`,
    }));

    return images;
  } catch (error) {
    console.error('Error fetching quiz images:', error.message);
    return [];
  }

};
// New function to increment age in the 'test' table
export const incrementUserAge = async (userId) => {
  try {
    // First, retrieve the current age
    const { data: userData, error: fetchError } = await supabase
      .from('test_table')
      .select('age')
      .eq('id', userId)
      .single();
    if (fetchError) throw fetchError;
    // Increment the age locally and update
    const newAge = userData.age + 1;
    const { data, error: updateError } = await supabase
      .from('test_table')
      .update({ age: newAge })
      .eq('id', userId)
      .select();
    if (updateError) throw updateError;
    return data;
  } catch (error) {
    console.error('Error incrementing age:', error.message);
    return null;
  }
};


