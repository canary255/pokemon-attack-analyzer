import { ReportProps } from "../../types/reportProps";
import { getPokemonSprite } from "../getPokemonSprite";
import { PokemonCalculatedData, surviveEnum } from "../../types/calcData";
import { INMMUNE_POKEMON_SET } from "../consts";

export const inmmunePokemon = async (pokemon: string, form: ReportProps) => {
  return {
    pokemon: pokemon,
    isInmune: true,
    canSurvive: surviveEnum.YES,
    calcExtreme: INMMUNE_POKEMON_SET,
    calcsSet: undefined,
    img: await getPokemonSprite(
      pokemon.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    ),
  } as unknown as PokemonCalculatedData;
};
