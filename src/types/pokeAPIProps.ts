export type PokeAPIProps = {
  abilities: Ability[];
  id: number;
  name: string;
  sprites: Sprites;
  stats: Stat[];
};

type Ability = {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
};

type Stat = {
  base_stat: number;
  effort: number;
};

export type Sprites = {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: {
    dream_world: {
      front_default: string;
      front_female: string;
    };
    home: {
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
    versions: {
      "generation-i": GenerationI;
      "generation-ii": GenerationIi;
      "generation-iii": GenerationIii;
      "generation-iv": GenerationIv;
      "generation-v": GenerationV;
      "generation-vi": GenerationVi;
      "generation-vii": GenerationVii;
      "generation-viii": GenerationViii;
    };
  };
};

interface GenerationI {
  "red-blue": SpriteWithGray;
  yellow: SpriteWithGray;
}

interface GenerationIi {
  crystal: Crystal;
  gold: GenIiSprite;
  silver: GenIiSprite;
}

interface Crystal {
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

interface GenerationIii {
  emerald: Sprite;
  "firered-leafgreen": Sprite;
  "ruby-sapphire": Sprite;
}

interface GenerationIv {
  "diamond-pearl": Sprite;
  "heartgold-soulsilver": Sprite;
  platinum: Sprite;
}

interface GenerationV {
  "black-white": BlackWhite;
}

interface BlackWhite {
  animated: Animated;
  front_default: string;
  front_shiny: string;
}

interface GenerationVi {
  "omegaruby-alphasapphire": Sprite;
  "x-y": Sprite;
}

interface GenerationVii {
  icons: Icons;
  "ultra-sun-ultra-moon": Sprite;
}

interface GenerationViii {
  icons: Icons;
}

interface Icons {
  front_default: string;
}

interface SpriteWithGray {
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

interface GenIiSprite {
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

interface Sprite {
  front_default: string;
  front_shiny: string;
}

interface Animated {
  front_default: string;
  front_shiny: string;
}
