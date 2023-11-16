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
          className={`items-center dark:  border-black min-[315px]:p-1 sm:p-2 shadow-lg 
          ${className}
      ${borderDirection[circleBorder]} 
      ${field.value ? "bg-primary" : "bg-white"}`}
        >
          <span
            className={`transition min-[315px]:text-xs sm:text-sm  ${
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
