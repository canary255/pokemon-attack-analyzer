import { useFormContext } from "react-hook-form";
import { SizeProps } from "../../types/size";
import { heightSize, widthSize } from "../../utils/consts";
import { isSmall } from "../../utils/isSmall";

interface TextFieldProps {
  type?: string;
  name: string;
  className?: string;
  onChange?: () => void;
  width?: SizeProps;
  height?: SizeProps;
  centerText?: boolean;
  readonly?: boolean;
  label?: string;
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
  const { register } = useFormContext();
  return (
    <div className="flex flex-col">
      {label ? <p className="mb-1">{label}</p> : null}
      <input
        {...register(name)}
        className={`border py-2 pl-5 pr-4 border-black 
         ${isSmall(width) ? "pl-1 pr-0" : "pl-5"}
         ${readonly ? "bg-gray-100" : "bg-white"}
         ${centerText ? "text-center" : ""} ${widthSize[width]}
         ${heightSize[height]} ${className}`}
        type={type}
        name={name}
        onChange={onChange}
        readOnly={readonly}
      />
    </div>
  );
};
