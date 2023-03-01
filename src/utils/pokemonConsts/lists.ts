import { Dex } from "@pkmn/dex";
import { notAllowedForms } from "./notAllowedForms";

export const getDexList = () => {
  const map = new Map(Object.entries(Dex.data.Species));
  const list: any = [];
  map.forEach((value) => {
    const form = value.name.split("-");
    const notAllowed = form[form.length - 1].toLowerCase();
    if (form.length > 1 && notAllowedForms.includes(notAllowed)) return;
    if (value.num > 0) list.push(value.name);
  });
  return list;
};

export const getItemList = () => {
  const map = new Map(Object.entries(Dex.data.Items));
  const list: any = [];
  map.forEach((value) => {
    list.push(value.name);
  });
  return list;
};

export const getAbilityList = () => {
  const map = new Map(Object.entries(Dex.data.Abilities));
  const list: any = [];
  map.forEach((value) => {
    list.push(value.name);
  });
  return list;
};

export const getMoveList = () => {
  const map = new Map(Object.entries(Dex.data.Moves));
  const list: any = [];
  map.forEach((value) => {
    if (value.category !== "Status") list.push(value.name);
  });
  return list;
};
