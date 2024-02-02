type DividerProps = {
  className?: string;
};
export const Divider = ({ className }: DividerProps) => {
  return (
    <hr
      className={`my-3 border-b-0 border-t-1 border-black dark:border-gray-500 ${className}`}
    />
  );
};
