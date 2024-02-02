import { PokeAPIProps } from "../types/pokeAPIProps";

export const getAvatarUrl = (specie: string, data: PokeAPIProps) => {
  if (specie === "porygon-z") {
    return data?.sprites.front_shiny;
  }
  return (
    data?.sprites.front_default ??
    data?.sprites.other["official-artwork"].front_default
  );
};
