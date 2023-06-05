import { FieldValues, useFormContext, UseFormSetValue } from "react-hook-form";
import { SizeProps } from "../../types/size";
import { heightSize, widthSize } from "../../utils/styleConsts";
import { isSmall } from "../../utils/isSmall";
import { Text } from "../Text/Text";

interface TextFieldProps {
  type?: string;
  name: string;
  className?: string;
  onChange?: () => void;
  width?: SizeProps;
  height?: SizeProps;
  centerText?: boolean;
  readonly?: boolean;
  label?: string | null;
  onlyNumber?: boolean;
  maxLength?: number;
  minNumber?: number;
  maxNumber?: number;
}

const handleNumber = (
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<FieldValues>,
  name: string,
  onlyNumber: boolean,
  maxNumber: number,
  minNumber: number
) => {
  const regex = /^[0-9\b]+$/;
  let value = e.currentTarget.value;
  if (onlyNumber) {
    if (value === "") value = "0";
    if (!regex.test(value)) {
      return;
    }
    const valueIntoNumber = +value;
    value = valueIntoNumber.toString();
    if (valueIntoNumber > maxNumber) value = maxNumber.toString();
    if (valueIntoNumber < minNumber) value = minNumber.toString();
  }
  setValue(name, value);
};

export const TextField = ({
  type = "text",
  name,
  className,
  onChange,
  width = "M",
  height = "S",
  centerText = false,
  readonly = false,
  label,
  onlyNumber = false,
  maxLength,
  minNumber = 0,
  maxNumber = 999,
}: TextFieldProps) => {
  const { getValues, setValue } = useFormContext();
  return (
    <div className="flex flex-col gap-y-1">
      {label ? <Text>{label}</Text> : null}
      <input
        onChange={(e: any) => {
          handleNumber(e, setValue, name, onlyNumber, maxNumber, minNumber);
        }}
        value={getValues(name)}
        className={`border py-2 pl-1 pr-4 border-black 
              ${isSmall(width) ? "pl-1 pr-0" : "pl-5"}
              ${readonly ? "bg-gray-100 " : "bg-white dark:bg-inputBackground"}
              ${centerText ? "text-center" : ""} ${widthSize[width]}
              ${heightSize[height]} ${className}`}
        type={type}
        name={name}
        readOnly={readonly}
        maxLength={maxLength}
      />
    </div>
  );
};
