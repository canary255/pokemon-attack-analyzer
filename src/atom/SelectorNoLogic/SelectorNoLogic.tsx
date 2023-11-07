import { Listbox } from "@headlessui/react";
import { OptionsType } from "../../types/options";
import { useTranslation } from "react-i18next";
import { Text } from "../Text/Text";
import { limitText } from "../../utils/limitText";
import { Icon } from "@iconify/react";

interface SelectorProps {
  className?: string;
  onChange?: (e: any) => void;
  centerText?: boolean;
  label?: string | null;
  selectorAbove?: boolean;
  options: OptionsType[];
  value: string;
  name?: string;
}

export const SelectorNoLogic = ({
  className,
  onChange,
  value,
  centerText = false,
  label,
  selectorAbove = false,
  options,
  name,
}: SelectorProps) => {
  const { t } = useTranslation();

  const optionStyles = (
    selected: boolean,
    active: boolean,
    disabled: boolean
  ) => {
    if (disabled) return "text-gray-300";
    if (selected) return "bg-purple-600 text-white";
    if (active) return "bg-purple-500 text-white cursor-pointer";
    return "text-gray-900";
  };

  const getTitle = (value: string) => {
    return options.find((item) => item.value == value)?.name ?? "";
  };

  return (
    <>
      <div className={`flex flex-col w-full gap-y-1 ${className}`}>
        {label ? <Text>{label}</Text> : null}
        <Listbox defaultValue={value} onChange={onChange} refName={name}>
          <Listbox.Button className={`relative`}>
            <div className="flex">
              <span
                className={`w-full dark:bg-inputBackground p-2 ${
                  centerText ? "text-center" : "flex justify-start"
                } border border-black border-r-0 bg-white rounded-lg rounded-r-none`}
              >
                {limitText(t(getTitle(value)) ?? "")}
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
                      value={item?.value}
                      className={({ selected, active, disabled }) =>
                        `cursor-default select-none p-2 ${optionStyles(
                          selected,
                          active,
                          disabled
                        )}`
                      }
                    >
                      {({ selected }) => (
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {limitText(t(item?.name))}
                        </span>
                      )}
                    </Listbox.Option>
                  ))
                : null}
            </Listbox.Options>
          </Listbox.Button>
        </Listbox>
      </div>
    </>
  );
};
