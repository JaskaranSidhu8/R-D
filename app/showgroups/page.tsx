//import { fetchUserGroups } from "@/actions/functions"; 
//import { Database } from "@/utils/types/supabase";
//import React from "react";
//
//export default async function TestGroupsPage() {
//  const user_id = 1; 
//  let groups 
//
//  try {
//    groups = await fetchUserGroups(user_id);
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
//              <p>Location: {group.location}</p>
//              <p>Size: {group.size}</p>
//            </li>
//          ))}
//        </ul>
//      ) : (
//        <p>No groups found for this user.</p>
//      )}
//    </div>
//  );
//}
