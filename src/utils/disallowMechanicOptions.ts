import { Fields } from "../types/fields";
import { Mechanic } from "../types/mechanic";

export const disallowMechanicOptions = (pokemon: string) => {
  const pokemonLower = pokemon.toLowerCase();
  if (pokemonLower === "terapagos-terastal") {
    return [Mechanic.terastal];
  }

  if (pokemonLower === "terapagos-stellar") {
    return [Mechanic.none, Mechanic.dynamax, Mechanic.zMove, Fields.TERATYPE];
  }

  return [];
};
