import { Text } from "../Text/Text";

interface TextFieldProps {
  type?: string;
  className?: string;
  onChange?: (e: any) => void;
  centerText?: boolean;
  readOnly?: boolean;
  label?: string | null;
  onlyNumber?: boolean;
  maxLength?: number;
  value?: string;
  placeholder?: string;
  name?: string;
}

export const TextFieldCommon = ({
  type = "text",
  className,
  onChange,
  centerText = false,
  readOnly = false,
  label,
  value,
  maxLength,
  placeholder,
  name,
}: TextFieldProps) => {
  return (
    <div className="flex flex-col gap-y-1">
      {label ? <Text>{label}</Text> : null}
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`border  min-[315px]:p-1 border-black rounded-lg px-2 py-1
              ${
                readOnly
                  ? "bg-transparent border-none"
                  : "bg-white dark:bg-inputBackground"
              }
              ${centerText ? "text-center" : ""}
               ${className}`}
        type={type}
        name={name}
        readOnly={readOnly}
        maxLength={maxLength}
      />
    </div>
  );
};
