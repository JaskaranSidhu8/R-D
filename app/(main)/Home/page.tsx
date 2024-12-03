"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GroupJoinForm from "@/components/Home/GroupJoinForm";
import PreviousGroups from "@/components/Home/PreviousGroups";
import { supabase } from "@/utils/supabaseClient";

const Home = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkTokensAndFetchEmail = async () => {
      // Retrieve the access token and refresh token from localStorage
      const accessToken = localStorage.getItem("supabase.auth.token");
      const refreshToken = localStorage.getItem("supabase.auth.refresh_token");
      const email = localStorage.getItem("user_email"); // Assuming the email is stored separately
      
      // Check if both tokens exist
      if (!accessToken || !refreshToken) {
        router.push("/Signin"); // Redirect to Signin if tokens are missing
        return;
      }

      // Check if email is available
      if (email) {
        setUserEmail(email); // Set the email to display greeting
      } else {
        router.push("/Signin"); // Redirect if email is missing
      }
    };

    checkTokensAndFetchEmail();
  }, [router]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
        setError("An error occurred while logging out.");
      } else {
        setSuccess("Successfully logged out.");
        router.push("/Signin");
      }
    } catch (err) {
      console.error("Unexpected logout error:", err);
      setError("An error occurred while logging out.");
    }
  };

  return (
    <div>
      <GroupJoinForm />
      <PreviousGroups />

      {/* Display user's email if available */}
      {userEmail ? <h2>Hi, {userEmail}!</h2> : <p>Loading user information...</p>}

      {/* Logout button */}
      <div className="mt-5">
        <button
          onClick={handleLogout}
          className="px-6 py-2 rounded bg-red-500 text-white"
        >
          Logout
        </button>
      </div>

      {/* Display success or error messages */}
      {success && <p className="text-green-500 mt-3">{success}</p>}
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default Home;