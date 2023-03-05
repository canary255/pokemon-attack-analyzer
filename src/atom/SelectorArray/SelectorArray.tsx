import { Listbox } from "@headlessui/react";
import { heightSize, widthSize } from "../../utils/styleConsts";
import { SizeProps } from "../../types/size";
import { isSmall } from "../../utils/isSmall";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Label } from "../Label/Label";
import { limitText } from "../../utils/limitText";

interface SelectorProps {
  name: string;
  className?: string;
  onChange?: () => void;
  width?: SizeProps;
  height?: SizeProps;
  centerText?: boolean;
  label?: string | null;
  selectorAbove?: boolean;
  options: number[] | string[];
}

export const SelectorArray = ({
  name,
  className,
  onChange,
  width = "M",
  height = "S",
  centerText = false,
  label,
  selectorAbove = false,
  options,
}: SelectorProps) => {
  const { control } = useFormContext();
  const { t } = useTranslation();

  const firstElement = options && options.length > 0 ? options[0] : "";

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

  return (
    <>
      <div className="flex flex-col">
        {label ? <Label className="mb-1">{label}</Label> : null}
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
              <Listbox.Button
                className={`${
                  centerText ? "text-center" : ""
                } pr-4 border border-black bg-white ${widthSize[width]} ${
                  heightSize[height]
                } ${className}`}
              >
                <div className="grid grid-cols-8">
                  <span className="col-span-7">{field.value}</span>
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
                          value={item}
                          className={({ active, disabled }) =>
                            `cursor-default select-none py-2 
                    ${isSmall(width) ? "pl-1 pr-0" : "pl-5"}
                     pr-4 ${optionStyles(
                       field.value === String(item),
                       active,
                       disabled
                     )}`
                          }
                        >
                          <span
                            className={`block truncate ${
                              field.value === String(item)
                                ? "font-medium"
                                : "font-normal"
                            }`}
                          >
                            {t(limitText(String(item)))}
                          </span>
                        </Listbox.Option>
                      ))
                    : null}
                </Listbox.Options>
              </div>
            </Listbox>
          )}
        />
      </div>
    </>
  );
};
