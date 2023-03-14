import { ReportProps } from "../types/reportProps";
import {
  get9thGenDexNames,
  getCompleteDex,
  getCompleteDexNames,
} from "./pokemonConsts/lists";
import { calculate, Generations, Pokemon, Move } from "@smogon/calc";
import React, { SetStateAction } from "react";

const gen = Generations.get(8); // alternatively: const gen = 5;

export const loadDataCalculator = async (
  form: ReportProps,
  setNumberDex: React.Dispatch<SetStateAction<number>>,
  setTotalDex: React.Dispatch<SetStateAction<number>>
) => {
  const dex =
    form.selectPokemon === "all"
      ? getCompleteDexNames()
      : await get9thGenDexNames();
  setTotalDex(dex.length);
  const calcsList = [];

  console.log(getCompleteDex());
  let i = 1;
  for (const pokemon of dex) {
    setNumberDex(i);
    try {
      const fetchData = await fetch(
        `https://www.pikalytics.com/api/p/2023-02/gen9vgc2023series2-1760/${pokemon
          .toLowerCase()
          .trim()}`
      );
      const defensiveData = await fetchData.json();
      console.log(defensiveData);
      calculateDamage(form, pokemon, defensiveData);
    } catch (e) {
      console.log("Invalid data", pokemon, e);
    } finally {
      i++;
    }
  }
};

const calculateDamage = (
  form: ReportProps,
  pokemon: string,
  defensiveData: any
) => {
  const evSpread = getEvSpread(defensiveData.spreads[0].ev);
  console.log(evSpread);
  const result = calculate(
    gen,
    new Pokemon(gen, form.name, {
      item: form.item,
      nature: form.nature,
      evs: { atk: +form.evAtk, spa: +form.evSpa },
      ivs: { atk: +form.ivAtk, spa: +form.ivSpa },
      boosts: { atk: +form.boostAtk, spa: +form.boostSpa },
    }),
    new Pokemon(gen, pokemon, {
      item: defensiveData.items[0].item,
      nature: defensiveData.spreads[0].nature,
      evs: { hp: evSpread.hp, def: evSpread.def, spd: evSpread.spd },
      ivs: { hp: 31, def: 31, spd: 31 },
    }),
    new Move(gen, form.move)
  );
  const sendData = {
    description: result.desc(),
    damage_range: result.damage,
    percent_range: [
      getPercentDamage(result.range()[0], result.defender.maxHP()),
      getPercentDamage(result.range()[1], result.defender.maxHP()),
    ],
    ko_chance: result.kochance(),
    defender_evs: result.defender.evs,
    text_evs: getEvsText(result.defender.evs),
    move_category: result.move.category,
  };
  console.log(sendData);
};

const getEvSpread = (spread: string) => {
  const evs = spread.split("/");
  const evSpread = {
    hp: +evs[0],
    atk: +evs[1],
    def: +evs[2],
    spa: +evs[3],
    spd: +evs[4],
    spe: +evs[5],
  };
  return evSpread;
};

function getEvsText(evs: { [key: string]: number }) {
  return `${evs.hp}/${evs.atk}/${evs.def}/${evs.spa}/${evs.spd}/${evs.spe}`;
}

function getPercentDamage(num: number, maxHP: number) {
  const percent = (num / maxHP) * 100 ?? 0;
  return percent;
}
