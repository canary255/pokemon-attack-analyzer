import type { Pokedex, PokemonData } from "../types/gen9Pokedex";
import { MIN_EV_SPREAD } from "../utils/consts";
import json from "../utils/gen9.json";

const gen9Pokedex: Pokedex = json;
const terapagosExtraForms = ["Terapagos-Stellar", "Terapagos-Terastal"];

export const getGen9PokemonNames = () => {
  const dex = gen9Pokedex.map((pokemon) => pokemon.name);
  dex.push(...terapagosExtraForms);
  return dex;
};

export const getGen9PokemonDefensiveDataList = () => {
  const list: Map<string, PokemonData> = new Map<string, PokemonData>();
  gen9Pokedex.forEach((pokemon) => {
    const { name, item, evs, nature, img } = pokemon;
    if (name.toLowerCase() === "terapagos") {
      terapagosExtraForms.forEach((form) => {
        list.set(form, {
          item: item ?? "",
          evs: evs ?? MIN_EV_SPREAD,
          nature: nature ?? "Hardy",
        });
      });
    }

    list.set(name, {
      item: item ?? "",
      evs: evs ?? MIN_EV_SPREAD,
      nature: nature ?? "Hardy",
      img: img ?? "",
    });
  });
  return list;
};
