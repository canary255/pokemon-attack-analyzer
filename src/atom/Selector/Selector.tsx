import { Controller, useFormContext } from "react-hook-form";
import { SelectorNoLogic } from "../SelectorNoLogic/SelectorNoLogic";
import { OptionsType } from "../../types/options";

interface SelectorProps {
  name: string;
  className?: string;
  onChange?: () => void;
  centerText?: boolean;
  label?: string | null;
  selectorAbove?: boolean;
  options: OptionsType[];
}

export const SelectorUI = ({
  name,
  className,
  centerText = false,
  label,
  selectorAbove = false,
  options,
}: SelectorProps) => {
  const { control } = useFormContext();

  const firstElement = options && options.length > 0 ? options[0] : "";

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={firstElement}
        render={({ field }) => (
          <SelectorNoLogic
            options={options}
            value={field.value}
            onChange={field.onChange}
            name={field.name}
            className={className}
            centerText={centerText}
            label={label}
            selectorAbove={selectorAbove}
          />
        )}
      />
    </>
  );
};
