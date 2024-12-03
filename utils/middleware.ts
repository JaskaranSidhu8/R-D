import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Create the Supabase client with cookies from the request
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll(); // Extract cookies from the request
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options); // Correct usage
          });
        },
      },
    }
  );

  // Get the user from Supabase session based on cookies
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    // If there is no user or an error occurred, redirect to the login page
    const url = request.nextUrl.clone();
    url.pathname = '/signin'; //test
    return NextResponse.redirect(url);
  }

  // If the user is authenticated, allow the request to proceed
  return supabaseResponse;
}
