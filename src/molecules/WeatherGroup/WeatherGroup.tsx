import { RadioGroup } from "@headlessui/react";
import { borderDirection } from "../../utils/styleConsts";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text } from "../../atom/Text/Text";
import { strongWeather, weather } from "../../utils/pokemonConsts";

interface RadioGroupProps {
  name: string;
  label?: string;
  className?: string;
  circleBorder?: "left" | "right" | "all" | "none";
}

const setBorderDirection = (index: number, length: number) => {
  if (index === 0) return "left";
  if (index === length - 1) return "right";
  return "none";
};

export const WeatherGroup = ({ name, label, className }: RadioGroupProps) => {
  const { t } = useTranslation();
  const { control, watch } = useFormContext();
  const value = watch(name);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={weather[0].value}
      render={({ field }) => (
        <>
          {label && <Text>{label}</Text>}
          <RadioGroup
            defaultValue={field.value}
            onChange={field.onChange}
            className={`flex flex-row ${className}`}
          >
            {weather?.map((option, index) => (
              <RadioGroup.Option
                key={index}
                value={option.value}
                className={`h-7 p-3 flex items-center justify-center border cursor-pointer border-black col-span-1
            ${borderDirection[setBorderDirection(index, weather?.length)]}
             ${
               value === option.value
                 ? "bg-primary text-white"
                 : "bg-white text-black dark:bg-inputBackground"
             }`}
              >
                {
                  <span
                    className={`text-sm
              ${borderDirection[setBorderDirection(index, weather?.length)]}
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
            ))}

            <div className="flex justify-center col-span-5">
              {strongWeather?.map((option, index) => (
                <RadioGroup.Option
                  key={index}
                  value={option.value}
                  className={`h-7 p-3 mt-1 flex items-center justify-center border cursor-pointer border-black col-span-1
            ${borderDirection[setBorderDirection(index, strongWeather?.length)]}
             ${
               value === option.value
                 ? "bg-primary text-white"
                 : "bg-white text-black dark:bg-inputBackground"
             }`}
                >
                  {
                    <span
                      className={`text-xs
              ${
                borderDirection[
                  setBorderDirection(index, strongWeather?.length)
                ]
              }
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
              ))}
            </div>
          </RadioGroup>
        </>
      )}
    />
  );
};
