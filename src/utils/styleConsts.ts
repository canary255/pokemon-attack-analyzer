export const borderDirection = {
  left: "rounded-l-lg",
  right: "rounded-r-lg",
  all: "rounded-full",
  none: "",
};

export const optionStyles = ({
  selected,
  disabled,
}: {
  selected: boolean;
  disabled: boolean;
}) => {
  if (disabled) return "text-gray-300";
  if (selected) return "bg-purple-600 text-white";
  return "text-gray-900";
};
