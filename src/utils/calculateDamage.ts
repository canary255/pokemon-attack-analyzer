import { ReportProps } from "../types/reportProps";
import { get9thGenDex, getDexList } from "./pokemonConsts/lists";

export const calculateDamage = async (form: ReportProps) => {
  const dex =
    form.selectPokemon === "all" ? getDexList() : await get9thGenDex();
  const calcsList = [];
  for (const pokemon of dex) {
    console.log(pokemon);
  }
};
