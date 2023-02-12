interface AvatarProps {
  className: string;
}

export const Avatar = ({ className }: AvatarProps) => {
  const size = 48;
  return (
    <div className={className}>
      <div
        className={`w-${size} h-${size} flex flex-row justify-center items-center border border-black rounded-full bg-cyan-200`}
      >
        <img
          className={`w-${size - 8} h-${size - 8}`}
          src="https://www.pngplay.com/wp-content/uploads/12/Zacian-Pokemon-Background-PNG.png"
          alt="Rounded avatar"
        />
      </div>
    </div>
  );
};
