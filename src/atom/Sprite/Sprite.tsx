type SpriteProps = {
  className?: string;
  src: string;
};

export const Sprite = ({ src, className = "bg-white" }: SpriteProps) => {
  return (
    <div
      className={`flex flex-row justify-center p-6 w-20 border rounded-xl shadow-md ${className}  `}
    >
      <img
        src="https://img.pokemondb.net/sprites/sun-moon/icon/bulbasaur.png"
        alt="Bulbasaur"
        className="max-w-md max-h-lg"
      />
    </div>
  );
};
