import { set } from "react-hook-form";
import { ABILITIES, ITEMS, MOVES, SPECIES } from "../calc";
import { getDate, setPreviousDate } from "../obtainApiDate";
import { notAllowedForms } from "./notAllowedForms";

const moveMap = new Map(Object.entries(MOVES[MOVES.length - 1]));
const moveList: any = [];
moveMap.forEach((value, key) => {
  if (value.category !== "Status") moveList.push({ ...value, name: key });
});

export const getCompleteDex = () => {
  const map = new Map(Object.entries(SPECIES[SPECIES.length - 1]));
  const list: any = [];

  map.forEach((value, key) => {
    const form = key.split("-");
    const notAllowed = form[form.length - 1].toLowerCase();
    if (form.length > 1 && notAllowedForms.includes(notAllowed)) return;
    list.push({ ...value, name: key });
  });
  return list;
};

export const getCompleteDexNames = () => {
  return getCompleteDex().map((value: any) => value.name);
};

export const getItemList = () => {
  const map = new Map(Object.entries(ITEMS[ITEMS.length - 1]));
  const list: any = [];
  map.forEach((value) => {
    list.push(value);
  });
  return list;
};

export const getAbilityList = () => {
  const map = new Map(Object.entries(ABILITIES[ABILITIES.length - 1]));
  const list: any = [];
  map.forEach((value) => {
    list.push(value);
  });
  return list;
};

export const getMoveList = () => {
  return moveList.map((value: any) => value.name);
};

export const getMoveDetails = (move: string) => {
  return moveList.find((value: any) => value.name === move);
};
