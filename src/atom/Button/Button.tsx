import { capitalizeEveryWord, capitalizeOneWord } from "../../utils/capitalize";
import { borderDirection } from "../../utils/consts";

interface ButtonProps {
  type?: "button" | "reset" | "submit";
  name: string;
  label?: string;
  className?: string;
  onClick?: () => void;
  circleBorder?: "left" | "right" | "all" | "none";
}

export const Button = ({
  type = "button",
  label = "Button",
  circleBorder = "none",
  name,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${className} ${borderDirection[circleBorder]} border border-black bg-primary text-white`}
      name={name}
      type={type}
      onClick={onClick}
    >
      {capitalizeEveryWord(label)}
    </button>
  );
};
