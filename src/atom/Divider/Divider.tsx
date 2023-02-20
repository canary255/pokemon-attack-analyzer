type DividerProps = {
  className?: string;
};
export const Divider = ({ className }: DividerProps) => {
  return <hr className={`my-3 border border-black ${className}`} />;
};
