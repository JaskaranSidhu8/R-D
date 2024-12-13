"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import FormField from "./FormField";
import Link from "next/link";
import { fetchAccountDetails, updateAccountDetails } from "@/actions/functions";
import { useRouter } from "next/navigation";
import { getUserAvatarUrl } from "@/actions/avatarfunctions";
import { useUser } from "@/context/UserContext";

interface FormData {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
}

interface AccountFormProps {
  defaultValues?: FormData;
}

const DEFAULT_VALUES: FormData = {
  firstName: "",
  lastName: "",
  country: "",
  city: "",
};

const AccountForm = ({ defaultValues = DEFAULT_VALUES }: AccountFormProps) => {
  const [formData, setFormData] = useState<FormData>(defaultValues);
  const [isModified, setIsModified] = useState(false);
  //const [avatarUrl, setAvatarUrl] = useState<string>("/pfp.jpg");
  const { firstName, lastName, avatarUrl, isLoading, refreshUserData } =
    useUser();
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const accountDetails = await fetchAccountDetails();
        setFormData({
          firstName: accountDetails.firstName || DEFAULT_VALUES.firstName,
          lastName: accountDetails.lastName || DEFAULT_VALUES.lastName,
          country: accountDetails.country || DEFAULT_VALUES.country,
          city: accountDetails.city || DEFAULT_VALUES.city,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsModified(true); // Mark the form as modified when any input changes
  };

  const handleSubmit = async () => {
    try {
      await updateAccountDetails(formData); // Pass the formData to update the account details
      console.log("Account details updated successfully!");
      setIsModified(false);

      // Navigate back to the settings page
      router.push("/Settings");
    } catch (error) {
      console.error("Error updating account details:", error);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto py-4">
      {/* Profile Image Section */}
      <div className="flex justify-center mb-2">
        <div className="relative">
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border border-gray-200"
          />
          <Link href="/Avatar">
            <button className="absolute bottom-0 right-0 p-1.5 bg-primary hover:bg-primary/90 rounded-full text-white">
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-start mb-8">
        <h2 className="montserrat mt-10 text-2xl">Account Details</h2>
      </div>

      <FormField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
      />
      <FormField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
      />
      <FormField
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleInputChange}
      />
      <FormField
        label="City"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
      />
      <Button
        onClick={handleSubmit} // Logic moved here
        variant={isModified ? "default" : "secondary"}
        disabled={!isModified} // Disable unless the form is modified
        className="mt-8"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default AccountForm;
