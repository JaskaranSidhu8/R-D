import { createClient } from "@supabase/supabase-js";

// Use environment variables for the Supabase URL and Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_DEV!;
const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY_DEV!;

// Initialize Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
