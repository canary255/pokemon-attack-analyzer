type SpriteProps = {
  className?: string;
  src?: string;
  isExample?: boolean;
  pokemonName?: string;
  onClick?: () => void;
};

export const Sprite = ({
  isExample = false,
  src,
  className = "bg-white",
  pokemonName,
  onClick,
}: SpriteProps) => {
  return (
    <div
      className={`flex flex-row justify-center p-3 border rounded-xl shadow-md ${className}`}
      onClick={onClick}
    >
      {isExample ? null : (
        <img
          src={src}
          alt={pokemonName ?? "Avatar"}
          className="max-w-md h-12"
        />
      )}
    </div>
  );
};
