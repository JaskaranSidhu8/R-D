import supabase from "@/utils/supabaseClient";

export async function getCuisineSoftConstraint(primaryType: string)  {
      // Step 1: Find the group_id using the primary_type
      const { data: mappingData, error: mappingError } = await supabase
        .from('cuisine_mappings')
        .select('group_id')
        .eq('google_cuisine', primaryType)
        .single();
  
      if (mappingError) {
        throw new Error(`Error fetching group_id: ${mappingError.message}`);
      }
  
      const groupId = mappingData?.group_id;
      if (!groupId) {
        console.log(`No group_id found for primary_type: ${primaryType}`);
      }
  
      // Step 2: Find the cuisine_soft_constraint using the group_id
      const { data: groupData, error: groupError } = await supabase
        .from('cuisine_groups')
        .select('cuisine_soft_constraints')
        .eq('id', groupId)
        .single();
  
      if (groupError) {
        throw new Error(`Error fetching cuisine_soft_constraint: ${groupError.message}`);
      }
  
      const softConstraint = groupData?.cuisine_soft_constraints;
      //console.log("The softCuisine is:", groupData.cuisine_soft_constraints)
      return softConstraint;

  }
  