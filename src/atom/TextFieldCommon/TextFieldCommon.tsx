import { FieldValues, useFormContext, UseFormSetValue } from "react-hook-form";
import { SizeProps } from "../../types/size";
import { heightSize, widthSize } from "../../utils/styleConsts";
import { isSmall } from "../../utils/isSmall";
import { Text } from "../Text/Text";

interface TextFieldProps {
  type?: string;
  className?: string;
  onChange?: () => void;
  width?: SizeProps;
  height?: SizeProps;
  centerText?: boolean;
  readonly?: boolean;
  label?: string | null;
  onlyNumber?: boolean;
  maxLength?: number;
  value?: string;
}

export const TextFieldCommon = ({
  type = "text",
  className,
  onChange,
  width = "M",
  height = "S",
  centerText = false,
  readonly = false,
  label,
  value,
  maxLength,
}: TextFieldProps) => {
  return (
    <div className="flex flex-col">
      {label ? <Text className="mb-1">{label}</Text> : null}
      <input
        onChange={onChange}
        value={value}
        className={`border py-2 pl-1 pr-4 border-black 
              ${isSmall(width) ? "pl-1 pr-0" : "pl-5"}
              ${readonly ? "bg-gray-100" : "bg-white"}
              ${centerText ? "text-center" : ""} ${widthSize[width]}
              ${heightSize[height]} ${className}`}
        type={type}
        readOnly={readonly}
        maxLength={maxLength}
      />
    </div>
  );
};
