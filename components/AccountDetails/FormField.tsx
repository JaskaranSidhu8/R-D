"use client";

import { Input } from "@/components/ui/input";

interface FormFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export const FormField = ({ label, name, value, onChange }: FormFieldProps) => {
    return (
      <div>
        <label className="text-sm text-muted-foreground mb-1.5 block">
          {label}
        </label>
        <Input
          name={name}
          value={value}
          onChange={onChange}
          className="h-12 rounded-full"
        />
      </div>
    );
  };
  