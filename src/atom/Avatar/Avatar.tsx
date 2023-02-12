interface AvatarProps {
  className: string;
}

export const Avatar = ({ className }: AvatarProps) => {
  return (
    <div className={className}>
      <div
        className={`w-48 h-48 flex flex-row justify-center items-center border border-black rounded-full bg-cyan-200`}
      >
        <img
          className={`w-36 h-36`}
          src="https://www.pngplay.com/wp-content/uploads/12/Zacian-Pokemon-Background-PNG.png"
          alt="Rounded avatar"
        />
      </div>
    </div>
  );
};
