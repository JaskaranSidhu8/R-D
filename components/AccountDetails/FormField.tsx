"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: "text" | "country";
}

const FormField = ({ label, name, value, onChange }: FormFieldProps) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-black mb-2 block">
        {label}
      </label>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        className="text-gray-500 placeholder:text-gray-400 bg-white border-[0.1px]"
      />
    </div>
  );
};

export default FormField;
