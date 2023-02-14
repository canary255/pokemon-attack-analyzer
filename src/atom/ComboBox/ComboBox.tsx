import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { SizeProps } from "../../types/size";
import { heightSize, widthSize } from "../../utils/styleConsts";
import { isSmall } from "../../utils/isSmall";
import { useTranslation } from "react-i18next";

interface ComboBoxProps {
  name: string;
  className?: string;
  onChange?: () => void;
  width?: SizeProps;
  height?: SizeProps;
  centerText?: boolean;
  label?: string | null;
  options?: string[];
}

export const ComboBoxUI = ({
  name,
  className,
  onChange,
  width = "M",
  height = "S",
  centerText = false,
  label,
  options = [],
}: ComboBoxProps) => {
  const array: string[] | undefined = [...options];
  const [query, setQuery] = useState("");
  const { control } = useFormContext();
  const { t } = useTranslation();

  const filteredArray =
    query === ""
      ? array
      : array?.filter((item) => {
          return item?.toLowerCase().includes(query.toLowerCase());
        });

  const selectedOrActiveStyles = (selected: boolean, active: boolean) => {
    if (selected) return "bg-red-600 text-white";
    if (active) return "bg-red-400 text-white";
    return "bg-white text-gray-900";
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      render={({ field }) => (
        <div className="flex flex-col">
          {label ? <p className="mb-1">{label}</p> : null}
          <Combobox
            defaultValue={field.value}
            onChange={field.onChange}
            refName={field.name}
          >
            <Combobox.Input
              className={`${
                centerText ? "text-center" : ""
              } py-2 pl-5 pr-4 border border-black ${widthSize[width]}
            ${isSmall(width) ? "pl-1 pr-0" : "pl-5"}
             ${heightSize[height]} ${className}`}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Options
              className={`rounded-md border absolute mt-[69px] ${widthSize[width]} border-black overflow-auto max-h-60`}
            >
              {filteredArray && filteredArray?.length > 0 ? (
                filteredArray?.map((item, index) => (
                  <Combobox.Option
                    key={index}
                    value={item}
                    className={({
                      active,
                      selected,
                    }) => `cursor-default select-none py-2 
                  pl-5 pr-4 
                  ${isSmall(width) ? "pl-1 pr-0" : "pl-5"}
                  ${selectedOrActiveStyles(selected, active)}`}
                  >
                    {({ selected }) => (
                      <span
                        className={`block truncate ${
                          selected ? "font-medium " : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                    )}
                  </Combobox.Option>
                ))
              ) : (
                <span className="block bg-white truncate select-none py-2 pl-5 pr-4">
                  {t("error.resultNotFound")}
                </span>
              )}
            </Combobox.Options>
          </Combobox>
        </div>
      )}
    />
  );
};
