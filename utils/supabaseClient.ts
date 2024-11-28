import { createClient } from "@supabase/supabase-js";

// Use environment variables for the Supabase URL and Key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL_DEV!;
const supabaseKey = process.env.REACT_APP_ANON_KEY_DEV!;

console.log("Supabase URL:", process.env.REACT_APP_SUPABASE_URL_DEV);
console.log("Supabase Key:", process.env.REACT_APP_ANON_KEY_DEV);

if (
  !process.env.REACT_APP_SUPABASE_URL_DEV ||
  !process.env.REACT_APP_SUPABASE_ANON_KEY_DEV
) {
  throw new Error("Supabase environment variables are not set!");
}

// Initialize Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// const supabaseUrl = "https://uqcrymzvamkqgrpribjf.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxY3J5bXp2YW1rcWdycHJpYmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMTM2MTAsImV4cCI6MjA0NTc4OTYxMH0.Br46z5HHUTT3m7U1w9tbnF1VA4KhnauoExEhUNMPVZo";
