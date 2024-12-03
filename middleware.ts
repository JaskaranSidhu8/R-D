import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabaseServer'; // Path to your createClient function

export async function middleware(req: NextRequest) {
  const supabase = await createClient(); // Create Supabase client with cookies from request

  // Get the user session using cookies
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error || !data?.user) {
    // If user is not authenticated or there is an error, redirect to the SignIn page
    return NextResponse.redirect(new URL('/signin', req.url));//test
  }

  // If user is authenticated, proceed with the next middleware or request
  return NextResponse.next();
}

export const config = {
  matcher: ['/home'], // Apply this middleware to the /home route //test
};
