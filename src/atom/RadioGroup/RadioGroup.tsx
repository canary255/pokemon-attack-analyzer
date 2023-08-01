import { RadioGroup } from "@headlessui/react";
import { borderDirection } from "../../utils/styleConsts";
import { Text } from "../Text/Text";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { OptionsType } from "../../types/options";

interface RadioGroupProps {
  name: string;
  label?: string;
  className?: string;
  circleBorder?: "left" | "right" | "all" | "none";
  options: OptionsType[];
}

const setBorderDirection = (index: number, length: number) => {
  if (index === 0) return "left";
  if (index === length - 1) return "right";
  return "none";
};

export const RadioGroupUI = ({
  name,
  label,
  className,
  options,
}: RadioGroupProps) => {
  const { t } = useTranslation();
  const { control, watch } = useFormContext();
  const value = watch(name);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={options ? options[0].value : ""}
      render={({ field }) => (
        <>
          {label && <Text>{label}</Text>}
          <RadioGroup
            defaultValue={field.value}
            onChange={field.onChange}
            className={`flex flex-row ${className}`}
          >
            {options
              ? options?.map((option, index) => (
                  <RadioGroup.Option
                    key={index}
                    value={option.value}
                    className={`h-7 p-3 flex items-center justify-center border cursor-pointer border-black col-span-1
            ${borderDirection[setBorderDirection(index, options?.length)]}
             ${
               value === option.value
                 ? "bg-primary text-white"
                 : "bg-white text-black dark:bg-inputBackground"
             }`}
                  >
                    {
                      <span
                        className={`sm:text-sm min-[315px]:text-[10px] 
              ${borderDirection[setBorderDirection(index, options?.length)]}
                ${
                  value === option.value
                    ? "bg-primary text-white font-medium"
                    : "text-black"
                }`}
                      >
                        {t(option.name)}
                      </span>
                    }
                  </RadioGroup.Option>
                ))
              : null}
          </RadioGroup>
        </>
      )}
    />
  );
};
