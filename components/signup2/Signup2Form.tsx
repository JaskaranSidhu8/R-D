"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CountrySelectList from "../static/CountrySelectList";
import { importUserData } from "@/actions/functions";
import { useRouter } from "next/navigation";
import PreferencesForm from "../Preferences/PreferenceForm";

const Signup2Form = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget); // Extract form data
      const { success, error } = await importUserData(formData);

      if (success) {
        router.push("/Home");
      } else {
        console.error("Error importing user data:", error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <form
      onSubmit={onSubmit} // Properly handle form submission
      className="flex flex-col space-y-5"
    >
      <Input name="firstName" type="text" placeholder="First Name" required />
      <Input name="lastName" type="text" placeholder="Last Name" required />
      <CountrySelectList name="country" />
      <Input name="city" type="text" placeholder="City" required />

      <PreferencesForm name="preferences" showSaveChanges={false} />

      <Button disabled={isLoading} type="submit" className="w-full">
        {isLoading ? "Creating account..." : "Create your account"}
      </Button>
    </form>
  );
};

export default Signup2Form;
