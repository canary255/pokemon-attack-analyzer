import { Listbox } from "@headlessui/react";
import { OptionsType } from "../../types/options";
import { useTranslation } from "react-i18next";
import { Text } from "../Text/Text";
import { limitText } from "../../utils/limitText";
import { Icon } from "@iconify/react";
import { optionStyles } from "../../utils/styleConsts";
import { useEffect, useRef, useState } from "react";

interface SelectorProps {
  className?: string;
  onChange?: (e: any) => void;
  centerText?: boolean;
  label?: string | null;
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
  options,
  name,
}: SelectorProps) => {
  const { t } = useTranslation();
  const selectorRef = useRef<HTMLDivElement>(null);
  const [isAbove, setIsAbove] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (selectorRef.current) {
        const SelectorRect = selectorRef.current.getBoundingClientRect();
        const isOverlappingBottom =
          window.innerHeight - SelectorRect.bottom < 150;
        setIsAbove(isOverlappingBottom);
      }
    };

    window.addEventListener("click", handleScroll);

    return () => {
      window.removeEventListener("click", handleScroll);
    };
  }, []);

  const getTitle = (value: string) => {
    return options.find((item) => item.value == value)?.name ?? "";
  };

  return (
    <div className={`flex flex-col gap-y-1 ${className}`}>
      {label ? <Text>{label}</Text> : null}
      <Listbox defaultValue={value} onChange={onChange} refName={name}>
        <Listbox.Button className={`relative`}>
          <div className="flex">
            <span
              className={`w-full dark:bg-inputBackground px-2 py-1 ${
                centerText ? "text-center" : "flex justify-start"
              } border border-black border-r-0 bg-white rounded-lg rounded-r-none shadow-lg`}
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
          <div className={` `} ref={selectorRef}></div>
          <Listbox.Options
            className={`bg-white absolute w-full z-10
              
               rounded-md border border-black overflow-auto max-h-60
               ${isAbove ? "bottom-full transform " : ""}`}
          >
            {options?.length > 0
              ? options.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    value={item?.value}
                    className={({ disabled }) =>
                      `cursor-default select-none p-2 hover:bg-purple-500 hover:text-white hover:cursor-pointer ${optionStyles(
                        {
                          selected: item?.value === value,
                          disabled,
                        }
                      )}`
                    }
                  >
                    <span
                      className={`block truncate ${
                        item?.value === value ? "font-medium" : "font-normal"
                      }`}
                    >
                      {limitText(t(item?.name))}
                    </span>
                  </Listbox.Option>
                ))
              : null}
          </Listbox.Options>
        </Listbox.Button>
      </Listbox>
    </div>
  );
};
