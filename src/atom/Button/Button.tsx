import { capitalizeEveryWord, capitalizeOneWord } from "../../utils/capitalize";
import { heightSize, widthSize } from "../../utils/consts";

interface TextFieldProps {
  type?: "button" | "reset" | "submit";
  name: string;
  label?: string;
  className?: string;
  onClick?: () => void;
  circleBorder?: "left" | "right" | "all" | "none";
  //width?: "XS" | "S" | "M" | "L" | "XL";
  //height?: "XS" | "S" | "M" | "L" | "XL";
}

const borderDirection = {
  left: "rounded-l-lg",
  right: "rounded-r-lg",
  all: "rounded-full",
  none: "",
};

export const Button = ({
  type = "button",
  label = "Button",
  circleBorder = "none",
  name,
  className,
  onClick,
}: //width = "M",
//height = "S",
TextFieldProps) => {
  return (
    <button
      className={`${className} ${borderDirection[circleBorder]} border border-black bg-[#5C6AC4] text-white`}
      name={name}
      type={type}
      onClick={onClick}
    >
      {capitalizeEveryWord(label)}
    </button>
  );
};
