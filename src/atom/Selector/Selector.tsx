import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { heightSize, widthSize } from "../../utils/consts";
import { SizeProps } from "../../types/size";
import { isSmall } from "../../utils/isSmall";
import { useFormContext } from "react-hook-form";

interface SelectorProps {
  name: string;
  className?: string;
  onChange?: () => void;
  width?: SizeProps;
  height?: SizeProps;
  centerText?: boolean;
  label?: string;
  side?: "up" | "down";
}

const people = [
  { id: 1, name: "Durward Reynolds ssf sdfsdf sdf", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 6, name: "Atk", unavailable: false },
  { id: 7, name: "Def", unavailable: false },
];

export const SelectorUI = ({
  name,
  className,
  onChange,
  width = "M",
  height = "S",
  centerText = false,
  label,
  side = "down",
}: SelectorProps) => {
  const { setValue, getValues } = useFormContext();
  const value = getValues(name);

  console.log(getValues(name));

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

  const limitText = (title: string, limit: number = 12) => {
    if (title.length > limit) return title.slice(0, limit) + "...";
    return title;
  };

  return (
    <>
      <div className="flex flex-col">
        {label ? <p className="mb-1">{label}</p> : null}
        <Listbox
          name={name}
          value={value ?? ""}
          onChange={(e: string) => {
            setValue(name, e);
          }}
        >
          <Listbox.Button
            className={`${
              centerText ? "text-center" : ""
            }  pr-4 border border-black bg-white ${widthSize[width]} ${
              heightSize[height]
            } ${className}`}
          >
            <div className="grid grid-cols-8">
              <span className="col-span-7">{limitText(value ?? "")}</span>
              <span className="col-span-1 material-symbols-outlined">
                expand_more
              </span>
            </div>
          </Listbox.Button>
          <div>
            <Listbox.Options
              className={`bg-white absolute ${widthSize[width]} 
              ${side == "up" ? "mt-[-15rem]" : ""}
               rounded-md border border-black overflow-auto max-h-60`}
            >
              {people.map((person, index) => (
                <Listbox.Option
                  key={index}
                  value={person?.name}
                  className={({ selected, active, disabled }) =>
                    `cursor-default select-none py-2 
                    ${isSmall(width) ? "pl-1 pr-0" : "pl-5"}
                     pr-4 ${optionStyles(selected, active, disabled)}`
                  }
                  disabled={person?.unavailable}
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {limitText(person?.name)}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
    </>
  );
};
