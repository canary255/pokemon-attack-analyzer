import { PokeAPIProps } from "../types/pokeAPIProps";
import { nameConverter } from "../utils/pokemonNameConverter";
import { useCustomSWR } from "./useCustomSWR";

export const usePokeapiData = (specie: string) => {
  const { data, error, isLoading, mutate } = useCustomSWR<PokeAPIProps>({
    url:
      specie !== ""
        ? `https://pokeapi.co/api/v2/pokemon/${nameConverter(specie)
            .replace(" ", "-")
            .toLowerCase()}`
        : null,
  });

  return { data, error, isLoading, mutate };
};
