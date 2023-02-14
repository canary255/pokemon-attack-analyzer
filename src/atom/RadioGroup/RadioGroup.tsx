import { RadioGroup } from "@headlessui/react";
import { borderDirection } from "../../utils/consts";
import { Label } from "../Label/Label";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface RadioGroupProps {
  name: string;
  label?: string;
  className?: string;
  circleBorder?: "left" | "right" | "all" | "none";
  options?:
    | {
        name: string;
        value: string;
      }[];
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
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={options ? options[0].value : ""}
      render={({ field }) => (
        <>
          {label && <Label>{label}</Label>}
          <RadioGroup
            defaultValue={field.value}
            onChange={field.onChange}
            className="flex flex-row"
          >
            {options
              ? options?.map((option, index) => (
                  <RadioGroup.Option
                    key={option.value}
                    value={option.value}
                    className={({ checked }) =>
                      `h-10 p-3 flex items-center justify-center border cursor-pointer border-black col-span-1
            ${borderDirection[setBorderDirection(index, options?.length)]}
             ${
               checked ? "bg-primary text-white" : "bg-white text-black"
             } ${className}`
                    }
                  >
                    {({ checked }) => (
                      <span
                        className={`
              ${borderDirection[setBorderDirection(index, options?.length)]}
                ${
                  checked ? "bg-primary text-white font-medium" : "text-black"
                }`}
                      >
                        {t(`button.${option.name}`)}
                      </span>
                    )}
                  </RadioGroup.Option>
                ))
              : null}
          </RadioGroup>
        </>
      )}
    />
  );
};
