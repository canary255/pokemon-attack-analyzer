import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { SizeProps } from "../../types/size";
import { heightSize, widthSize } from "../../utils/consts";
import { isSmall } from "../../utils/isSmall";

interface ComboBoxProps {
  name: string;
  className?: string;
  onChange?: () => void;
  width?: SizeProps;
  height?: SizeProps;
  centerText?: boolean;
  label?: string | null;
}

const people = [
  { value: 0, name: "Durward Reynolds" },
  { value: 1, name: "Kenton Towne" },
  { value: 2, name: "Therese Wunsch" },
  { value: 3, name: "Benedict Kessler" },
  { value: 4, name: "Katelyn Rohan" },
];

export const ComboBoxUI = ({
  name,
  className,
  onChange,
  width = "M",
  height = "S",
  centerText = false,
  label,
}: ComboBoxProps) => {
  const [query, setQuery] = useState("");
  const { control } = useFormContext();

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
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
      defaultValue={people[0].name}
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
              {filteredPeople.length > 0 ? (
                filteredPeople.map((person, index) => (
                  <Combobox.Option
                    key={index}
                    value={person.name}
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
                        {person.name}
                      </span>
                    )}
                  </Combobox.Option>
                ))
              ) : (
                <span className="block bg-white truncate select-none py-2 pl-5 pr-4">
                  Results not found
                </span>
              )}
            </Combobox.Options>
          </Combobox>
        </div>
      )}
    />
  );
};
