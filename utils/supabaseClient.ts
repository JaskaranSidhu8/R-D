import { createClient } from '@supabase/supabase-js';
//import Cookies from 'js-cookie'; 

// Fetch environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
//const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
//export const supabaseServerClient = createClient(supabaseUrl, supabaseServiceKey);

/*
// Check if there's a session cookie and set the session accordingly
const savedSession = Cookies.get('supabase_token');

if (savedSession) {
    const session = JSON.parse(savedSession); // Parse the session string to an object
    supabase.auth.setSession({
      access_token: session.access_token, // Set the access token
      refresh_token: session.refresh_token, // Set the refresh token
    });
  } else {
    // If no session, clear the session
    supabase.auth.setSession({ access_token: '', refresh_token: '' });
  }
    */