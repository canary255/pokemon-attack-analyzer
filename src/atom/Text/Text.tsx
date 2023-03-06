import React from "react";

interface TextProps {
  className?: string;
  children?: React.ReactNode;
}

export const Text = ({ className, children }: TextProps) => {
  return (
    <p className={`${className} text-sm text-black dark:text-white`}>
      {children}
    </p>
  );
};
