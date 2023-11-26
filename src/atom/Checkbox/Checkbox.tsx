// Checkbox.tsx
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface CheckboxProps {
  name: string;
  label?: string;
  classname?: string;
}

export const Checkbox = ({ name, label = "", classname }: CheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <label className="flex items-center space-x-2 relative cursor-pointer">
          <input {...field} type="checkbox" className="hidden" />
          <div
            className={`${
              field.value ? "bg-[#1D3B8E]" : "bg-white"
            } w-8 h-8 ${classname} font-bold border border-gray-400 rounded-md flex items-center justify-center transition-all duration-300`}
          >
            {field.value && (
              <span
                className="text-white checked animate-checkAnimation"
                role="img"
                aria-label="check"
              >
                &#x2713;
              </span>
            )}
          </div>
          <span className="text-gray-700">{label}</span>
        </label>
      )}
    />
  );
};
