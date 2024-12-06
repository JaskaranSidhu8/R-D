//import { fetchUserGroups } from "@/actions/functions"; // Adjust the path
//import { Database } from "@/utils/types/supabase";
//import React from "react";
//import type { groupss } from "@/actions/functions";
//
//export default async function TestGroupsPage() {
//  const user_id = 0; // Replace with the user ID to test
//  let groups: groupss = [];
//
//  try {
//    groups = await fetchUserGroups(user_id);
//    console.log("groups:", groups);
//  } catch (error) {
//    console.error("Error fetching groups:", error);
//  }
//
//  return (
//    <div>
//      <h1>Test Groups</h1>
//      {groups.length > 0 ? (
//        <ul>
//          {groups.map((group) => (
//            <li key={group.id}>
//              <p>ID: {group.id}</p>
//            </li>
//          ))}
//        </ul>
//      ) : (
//        <p>No groups found for this user.</p>
//      )}
//    </div>
//  );
//}
