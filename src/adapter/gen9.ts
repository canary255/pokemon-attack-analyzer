import type { Pokedex, PokemonData } from "../types/gen9Pokedex";
import json from "../utils/gen9.json";

const gen9Pokedex: Pokedex = json;

export const getGen9PokemonNames = () => {
  return gen9Pokedex.map((pokemon) => pokemon.name);
};

export const getGen9PokemonDefensiveDataList = () => {
  const list: Map<string, PokemonData> = new Map<string, PokemonData>();
  gen9Pokedex.forEach((pokemon) => {
    const { name, item, evs, nature, img } = pokemon;
    list.set(name, {
      item: item ?? "",
      evs: evs ?? "0/0/0/0/0/0",
      nature: nature ?? "Hardy",
      img: img ?? "",
    });
  });
  return list;
};
