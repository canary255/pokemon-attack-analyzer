import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text } from "../Text/Text";

interface ComboBoxProps {
  name: string;
  className?: string;
  onChange?: () => void;
  centerText?: boolean;
  label?: string | null;
  options?: string[];
}

export const ComboBoxUI = ({
  name,
  className,
  onChange,
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
      ? undefined
      : array
          ?.filter((item) => {
            return item?.toLowerCase().includes(query.toLowerCase());
          })
          .slice(0, 100);

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
        <div className={`flex flex-col gap-y-1 w-full ${className}`}>
          {label ? <Text>{label}</Text> : null}
          <Combobox
            defaultValue={field.value}
            value={field.value}
            onChange={field.onChange}
            refName={field.name}
          >
            <div className="relative">
              <Combobox.Input
                className={` dark:bg-inputBackground ${
                  centerText ? "text-center" : ""
                } px-2 py-1 w-full border border-black rounded-lg shadow-lg`}
                onChange={(event) => setQuery(event.target.value)}
              />

              {filteredArray && (
                <Combobox.Options
                  className={`w-full rounded-md border absolute z-10 border-black overflow-auto max-h-60`}
                >
                  {filteredArray?.length > 0 ? (
                    <>
                      {filteredArray?.map((item, index) => (
                        <Combobox.Option
                          key={index}
                          value={item}
                          className={({
                            active,
                            selected,
                          }) => `cursor-default select-none py-2 
                  pl-5 pr-4 
                 
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
                      ))}
                    </>
                  ) : (
                    <span className="block bg-white truncate select-none py-2 pl-5 pr-4">
                      {t("error.resultNotFound")}
                    </span>
                  )}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>
      )}
    />
  );
};
