export async function deleteRestaurantsWithHighId() {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("restaurant_times")
    .delete()
    .gt("restaurant_id", 281); // Deletes rows where restaurant_id > 281

  if (error) {
    console.error("Error deleting restaurants:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
