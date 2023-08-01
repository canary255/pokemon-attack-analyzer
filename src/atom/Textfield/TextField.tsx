import { FieldValues, useFormContext, UseFormSetValue } from "react-hook-form";
import { TextFieldCommon } from "../TextFieldCommon/TextFieldCommon";

interface TextFieldProps {
  type?: string;
  name: string;
  className?: string;
  onChange?: () => void;
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
  centerText = false,
  readonly: readOnly = false,
  label,
  onlyNumber = false,
  maxLength,
  minNumber = 0,
  maxNumber = 999,
}: TextFieldProps) => {
  const { getValues, setValue } = useFormContext();
  return (
    <TextFieldCommon
      label={label}
      onChange={(e: any) => {
        handleNumber(e, setValue, name, onlyNumber, maxNumber, minNumber);
      }}
      value={getValues(name)}
      className={`border border-black `}
      centerText={centerText}
      type={type}
      name={name}
      readOnly={readOnly}
      maxLength={maxLength}
    />
  );
};
