import React from "react";

interface LabelProps {
  className?: string;
  children?: React.ReactNode;
}

export const Label = ({ className, children }: LabelProps) => {
  return <p className={`${className} text-sm`}>{children}</p>;
};
