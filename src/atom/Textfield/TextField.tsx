import { Controller, useFormContext } from "react-hook-form";
import { SizeProps } from "../../types/size";
import { heightSize, widthSize } from "../../utils/styleConsts";
import { isSmall } from "../../utils/isSmall";
import { Label } from "../Label/Label";

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
}

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
}: TextFieldProps) => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-col">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            {label ? <Label className="mb-1">{label}</Label> : null}
            <input
              onChange={field.onChange}
              value={field.value}
              className={`border py-2 pl-5 pr-4 border-black 
              ${isSmall(width) ? "pl-1 pr-0" : "pl-5"}
              ${readonly ? "bg-gray-100" : "bg-white"}
              ${centerText ? "text-center" : ""} ${widthSize[width]}
              ${heightSize[height]} ${className}`}
              type={type}
              name={name}
              readOnly={readonly}
            />
          </>
        )}
      />
    </div>
  );
};
