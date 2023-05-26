import { Listbox } from "@headlessui/react";
import { heightSize, widthSize } from "../../utils/styleConsts";
import { SizeProps } from "../../types/size";
import { isSmall } from "../../utils/isSmall";
import { OptionsType } from "../../types/options";
import { useTranslation } from "react-i18next";
import { Text } from "../Text/Text";
import { limitText } from "../../utils/limitText";

interface SelectorProps {
  className?: string;
  onChange?: (e: any) => void;
  width?: SizeProps;
  height?: SizeProps;
  centerText?: boolean;
  label?: string | null;
  selectorAbove?: boolean;
  options: OptionsType[];
  value: string;
}

export const SelectorNoLogic = ({
  className,
  onChange,
  width = "M",
  height = "S",
  value,
  centerText = false,
  label,
  selectorAbove = false,
  options,
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
      <div className="flex flex-col">
        {label ? <Text className="mb-1">{label}</Text> : null}
        <Listbox defaultValue={value} onChange={onChange}>
          <Listbox.Button
            className={`dark:bg-inputBackground ${
              centerText ? "text-center" : ""
            } pr-4 border border-black bg-white ${widthSize[width]} ${
              heightSize[height]
            } ${className}`}
          >
            <div className="grid grid-cols-8">
              <span className="col-span-7">
                {limitText(t(getTitle(value)) ?? "")}
              </span>
              <span className="col-span-1 material-symbols-outlined">
                expand_more
              </span>
            </div>
          </Listbox.Button>
          <div>
            <Listbox.Options
              className={`bg-white absolute ${widthSize[width]} 
              ${selectorAbove ? "mt-[-15rem]" : ""}
               rounded-md border border-black overflow-auto max-h-60`}
            >
              {options?.length > 0
                ? options.map((item, index) => (
                    <Listbox.Option
                      key={index}
                      value={item?.value}
                      className={({ selected, active, disabled }) =>
                        `cursor-default select-none py-2 
                    ${isSmall(width) ? "pl-1 pr-0" : "pl-5"}
                     pr-4 ${optionStyles(selected, active, disabled)}`
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
          </div>
        </Listbox>
      </div>
    </>
  );
};
