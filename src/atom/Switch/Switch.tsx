import { Switch } from "@headlessui/react";
import { borderDirection } from "../../utils/styleConsts";
import { Controller, useFormContext } from "react-hook-form";

interface SwitchProps {
  name: string;
  label?: string | null;
  className?: string;
  circleBorder?: "left" | "right" | "all" | "none";
}

export const SwitchUI = ({
  label = "Switch",
  circleBorder = "all",
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
          className={`items-center p-2
          ${className}
      ${borderDirection[circleBorder]} 
      ${field.value ? "bg-primary" : "bg-gray-200"}`}
        >
          <span
            className={`transition ${
              field.value ? "text-white bold" : "text-black"
            }`}
          >
            {label}
          </span>
        </Switch>
      )}
    />
  );
};
