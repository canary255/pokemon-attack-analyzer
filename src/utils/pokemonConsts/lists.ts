import { MOVES, SPECIES, ITEMS, ABILITIES } from "@smogon/calc";
import { notAllowedForms } from "./notAllowedForms";
import { SpeciesData } from "@smogon/calc/dist/data/species";
import { MoveData } from "@smogon/calc/dist/data/moves";
import { notAllowedPokemon } from "./notAllowedPokemon";

const moveMap = new Map(Object.entries(MOVES[MOVES.length - 1]));
const moveList: (MoveData & { name: string })[] = [];
moveMap.forEach((value, key) => {
  if (value.category !== "Status") moveList.push({ ...value, name: key });
});

export const getCompleteDex = () => {
  const map = new Map(Object.entries(SPECIES[SPECIES.length - 1]));
  const list: (SpeciesData & { name: string })[] = [];

  map.forEach((value, key) => {
    const form = key.split("-");
    const notAllowed = form[form.length - 1].toLowerCase();
    if (
      (form.length > 1 && notAllowedForms.includes(notAllowed)) ||
      notAllowedPokemon.includes(key)
    )
      return;
    list.push({ ...value, name: key });
  });
  return list;
};

export const getCompleteDexNames = () => {
  return getCompleteDex().map((value: any) => value.name);
};

export const getItemList = () => {
  const map = new Map(Object.entries(ITEMS[ITEMS.length - 1]));
  const list: string[] = [];
  map.forEach((value) => {
    list.push(value);
  });
  return list;
};

export const getAbilityList = () => {
  const map = new Map(Object.entries(ABILITIES[ABILITIES.length - 1]));
  const list: string[] = [];
  map.forEach((value) => {
    list.push(value);
  });
  return list;
};

export const getMoveList = () => {
  return moveList.map((value) => value.name);
};

export const getMoveDetails = (move: string) => {
  return moveList.find((value) => value.name === move);
};
