import { Switch } from "@headlessui/react";
import { borderDirection } from "../../utils/consts";
import { Controller, useFormContext } from "react-hook-form";

interface SwitchProps {
  name: string;
  label?: string;
  className?: string;
  circleBorder?: "left" | "right" | "all" | "none";
}

export const SwitchUI = ({
  label = "Switch",
  circleBorder = "none",
  name,
  className,
}: SwitchProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Switch
          checked={field.value}
          onChange={field.onChange}
          className={`items-center
          ${className}
      ${borderDirection[circleBorder]} 
      ${field.value ? "bg-[#5C6AC4]" : "bg-gray-200"}`}
        >
          <span
            className={`transition ${
              field.value ? "text-white" : "text-black"
            }`}
          >
            {label}
          </span>
        </Switch>
      )}
    />
  );
};
