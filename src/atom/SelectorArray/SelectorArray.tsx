import { Listbox } from "@headlessui/react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text } from "../Text/Text";
import { limitText } from "../../utils/limitText";
import { Icon } from "@iconify/react";
import { optionStyles } from "../../utils/styleConsts";

interface SelectorProps {
  name: string;
  className?: string;
  onChange?: () => void;
  centerText?: boolean;
  label?: string | null;
  selectorAbove?: boolean;
  options: number[] | string[];
}

export const SelectorArray = ({
  name,
  className,
  onChange,
  centerText = false,
  label,
  selectorAbove = false,
  options,
}: SelectorProps) => {
  const { control } = useFormContext();
  const { t } = useTranslation();

  const firstElement = options && options.length > 0 ? options[0] : "";

  return (
    <>
      <div className="flex flex-col">
        {label ? <Text className="mb-1">{label}</Text> : null}
        <Controller
          name={name}
          control={control}
          defaultValue={firstElement}
          render={({ field }) => (
            <Listbox
              defaultValue={field.value}
              onChange={field.onChange}
              refName={field.name}
            >
              <Listbox.Button className={`relative ${className}`}>
                <div className="flex">
                  <span
                    className={`w-full dark:bg-inputBackground px-2 py-1 ${
                      centerText ? "text-center" : ""
                    } border border-black border-r-0 bg-white rounded-lg rounded-r-none shadow-lg `}
                  >
                    {field.value}
                  </span>
                  <span
                    className="flex flex-col w-8 dark:bg-inputBackground
                items-center justify-center focus:border-none
               bg-white border border-black border-l-0 rounded-lg rounded-l-none"
                  >
                    <Icon icon="ic:outline-keyboard-arrow-down" fontSize={24} />
                  </span>
                </div>
                <Listbox.Options
                  className={`bg-white absolute w-full z-10
              ${selectorAbove ? "mt-[-15rem]" : ""}
               rounded-md border border-black overflow-auto max-h-60`}
                >
                  {options?.length > 0
                    ? options.map((item, index) => (
                        <Listbox.Option
                          key={index}
                          value={item}
                          className={({ disabled }) =>
                            `cursor-default select-none p-2 hover:bg-purple-500 hover:text-white hover:cursor-pointer  ${optionStyles(
                              {
                                selected: item === field.value,
                                disabled,
                              }
                            )}`
                          }
                        >
                          <span
                            className={`block truncate ${
                              item === field.value
                                ? "font-medium"
                                : "font-normal"
                            }`}
                          >
                            {limitText(t(String(item)))}
                          </span>
                        </Listbox.Option>
                      ))
                    : null}
                </Listbox.Options>
              </Listbox.Button>
            </Listbox>
          )}
        />
      </div>
    </>
  );
};
