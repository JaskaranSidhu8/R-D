//import { user } from "./user";
//import { group } from "./group";
//import { preferenceUser } from "./user";
//
//
//export interface groupUsers {
//    id: number; // Primary key
//    user_id: number; // Foreign key to `users`
//    group_id: number; // Foreign key to `groups`
//    softconstraints: string; // Preferences specific to the user in this group
//    users?: user; // Nested user object
//    group?: group; // Nested group object
//  }
//
//
//export interface groupUsersPreferences {
//  id: number;
//  user_id: number;
//  group_id: number;
//  softconstraints: string;
//  users?: user;
//}
//
