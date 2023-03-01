interface AvatarProps {
  className: string;
  url: string | undefined;
}

export const Avatar = ({ className, url }: AvatarProps) => {
  return (
    <div className={className}>
      <div
        className={`w-48 h-48 flex flex-row justify-center items-center border border-black rounded-full bg-cyan-200`}
      >
        <img
          className={`w-[70%] h-[70%] `}
          src={
            url ??
            "https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png"
          }
          alt="Rounded avatar"
        />
      </div>
    </div>
  );
};
