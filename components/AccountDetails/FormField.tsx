"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = ({ 
  label, 
  name, 
  value, 
  onChange 
}: FormFieldProps) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-black mb-2 block">
        {label}
      </label>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        className="text-gray-500 placeholder:text-gray-400"
      />
    </div>
  );
};

export default FormField;