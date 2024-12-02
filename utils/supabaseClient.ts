import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase";

// Use environment variables for the Supabase URL and Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_DEV!;
const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY_DEV!;

console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL_DEV);
console.log("Supabase Key:", process.env.NEXT_PUBLIC_ANON_KEY_DEV);

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL_DEV ||
  !process.env.NEXT_PUBLIC_ANON_KEY_DEV
) {
  throw new Error("Supabase environment variables are not set!");
}

// Initialize Supabase
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
