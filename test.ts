import supabase from "./utils/supabaseClient";
import { Database } from "./utils/types/supabase";
// Function to check and insert
async function checkIdAndInsertUser(groupId: number, userId: number) {
    const { data: groupData, error: groupError } = await supabase
        .from('groups') // Check in the groups table
        .select('*')
        .eq('id', groupId)
        .single();

    if (groupError) {
        return { success: false, message: 'Group not found' };
    }

    const { error: insertError } = await supabase
        .from('group_users') // Insert into the group_users table
        .insert({
            group_id: groupId,
            user_id: userId,
        });

    if (insertError) {
        return { success: false, error: insertError.message };
    }

    return { success: true, message: 'User added successfully' };
}

// Test the function
checkIdAndInsertUser(1, 2) // Replace with your group_id and user_id
    .then(console.log)
    .catch(console.error);