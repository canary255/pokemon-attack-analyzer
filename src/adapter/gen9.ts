import type { Item, Pokedex, PokemonData } from "../types/gen9pokedex";
import json from "../utils/gen9.json";

const gen9Pokedex: Pokedex = json;

export const getGen9PokemonNames = () => {
  return gen9Pokedex.map((pokemon) => pokemon.name);
};

export const getGen9PokemonDefensiveDataList = () => {
  const list: Map<string, PokemonData> = new Map<string, PokemonData>();
  gen9Pokedex.forEach((pokemon) => {
    const { name, items, spreads } = pokemon;
    const spread = spreads ? spreads[0] : undefined;
    list.set(name, {
      item: items ? items[0].item : "",
      evs: spread ? spread.ev : "0/0/0/0/0/0",
      nature: spread ? spread.nature : "Hardy",
    });
  });
  getJson();
  return list;
};
export const getJson = async () => {
  const list: any = [];
  gen9Pokedex.forEach(async (pokemon) => {
    const fetchData = await fetch(
      `https://www.pikalytics.com/api/p/2023-04/gen9vgc2023regc-1760/${pokemon.name
        .toLowerCase()
        .trim()}`
    );
    if (!fetchData.ok) {
      throw new Error("Request failed");
    }
    const responseData = await fetchData.json();
    list.push(responseData);
  });
};
