"use client";

import { Button } from "@/components/ui/button";
import  FormField  from "./FormField";

interface FormData {
  fullName: string;
  country: string;
  city: string;
}

interface AccountFormProps {
  formData: {
    fullName: string;
    country: string;
    city: string;
  };
  isModified: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const AccountForm = ({
  formData,
  isModified,
  onInputChange,
  onSubmit,
}: AccountFormProps) => {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="space-y-4">
        <FormField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={onInputChange}
        />
        <FormField
          label="Country"
          name="country"
          value={formData.country}
          onChange={onInputChange}
        />
        <FormField
          label="City"
          name="city"
          value={formData.city}
          onChange={onInputChange}
        />

        <Button 
          onClick={onSubmit}
          className="w-full mt-4"
          variant={isModified ? "default" : "secondary"}
          disabled={!isModified}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AccountForm;