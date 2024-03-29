import { getPokemonSprite } from "../../getPokemonSprite";
import { PokemonCalculatedData, surviveEnum } from "../../../types/calcData";
import { INMMUNE_POKEMON_SET } from "../../consts";

export const inmmunePokemon = async (pokemon: string) => {
  return {
    pokemon: pokemon,
    isInmune: true,
    calcExtreme: INMMUNE_POKEMON_SET,
    calcsSet: undefined,
    img: await getPokemonSprite(
      pokemon.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    ),
  } as unknown as PokemonCalculatedData;
};
