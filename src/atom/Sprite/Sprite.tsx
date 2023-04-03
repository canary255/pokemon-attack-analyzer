type SpriteProps = {
  className?: string;
  src?: string;
  isExample?: boolean;
  pokemonName?: string;
};

export const Sprite = ({
  isExample = false,
  src,
  className = "bg-white",
  pokemonName,
}: SpriteProps) => {
  return (
    <div
      className={`flex flex-row justify-center p-3 border rounded-xl shadow-md ${className}  `}
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
