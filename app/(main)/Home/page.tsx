"use client"; // Mark this component as a Client Component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import router for redirection
import GroupJoinForm from "@/components/Home/GroupJoinForm";
import PreviousGroups from "@/components/Home/PreviousGroups";
import { supabase } from "@/utils/supabaseClient"; // Import Supabase client

const Home = () => {
  const [userName, setUserName] = useState<string | null>(null); // To store the user's display name
  const [error, setError] = useState<string | null>(null); // For error handling
  const [success, setSuccess] = useState<string | null>(null); // For success feedback
  const router = useRouter();

  useEffect(() => {
    // Fetch user data when the component is mounted
    const fetchUserData = async () => {
      const { data, error: sessionError } = await supabase.auth.getSession(); // Get the current session

      if (sessionError) {
        console.error("Error fetching session:", sessionError);
        setError("Failed to get session.");
        return;
      }

      const session = data?.session; // Destructure session from data

      if (session?.user) {  // Ensure session and user are not null
        const userEmail = session.user.email;

        try {
          // Query the 'test_users' table for the user's name based on their email
          const { data: userData, error: userQueryError } = await supabase
            .from('test_users')
            .select('name')
            .eq('email', userEmail)
            .single(); // Assuming only one user with that email

          if (userQueryError) {
            console.error("Error querying 'test_users' table:", userQueryError);
            setError("Failed to fetch user name.");
          } else if (userData) {
            setUserName(userData.name); // Set the user's name
          } else {
            console.error("No user found with this email.");
            setError("No user found with this email.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data.");
        }
      } else {
        setError("No user is logged in.");
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handle logout
  const handleLogout = async () => {
    console.log("Logging out..."); // Log for debugging
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error during logout:", error); // Log error if sign-out fails
        setError("An error occurred while logging out. Please try again.");
      } else {
        console.log("Logout successful."); // Log success
        setSuccess("You have been logged out successfully.");
        router.push("/Signin"); // Redirect to Signin after successful logout
      }
    } catch (err) {
      console.error("Error during logout:", err); // Log unexpected errors
      setError("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <div>
      <GroupJoinForm />
      <PreviousGroups />

      {/* Display user's name if available */}
      {userName ? <h2>Hi, {userName}!</h2> : <p>Loading user information...</p>}

      {/* Display logout button */}
      <div className="mt-5">
        <button
          onClick={handleLogout}
          className="px-6 py-2 rounded bg-red-500 text-white"
        >
          Logout
        </button>
      </div>

      {/* Display success or error message */}
      {success && <p className="text-green-500 mt-3">{success}</p>}
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default Home;
