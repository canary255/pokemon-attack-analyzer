import { ReportProps } from "../types/reportProps";
import {
  get9thGenDexNames,
  getCompleteDex,
  getCompleteDexNames,
} from "./pokemonConsts/lists";
import React, { SetStateAction } from "react";
import { calculate, Generations, MOVES, SPECIES, TYPE_CHART } from "./calc";
import { Pokemon } from "./calc/pokemon";
import { Move } from "./calc/move";
import { CalcData } from "../types/calcData";
import { ItemName, NatureName } from "./calc/data/interface";

type PokemonData = {
  items: string;
  nature: string;
  evs: string;
};

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
  const moveType = MOVES[MOVES.length - 1][form.move].type;

  let i = 1;
  for (const pokemon of dex) {
    if (i === 10) break;
    setNumberDex(i);
    const pokemonType = SPECIES[SPECIES.length - 1][pokemon].types;
    const typeValue = TYPE_CHART[TYPE_CHART.length - 1];

    //1 - añadir inmunidad de tipos

    if (
      typeValue?.[moveType]?.[pokemonType[0]] === 0 ||
      (pokemonType[1] && typeValue?.[moveType]?.[pokemonType[1]] === 0)
    ) {
      calcsList.push({
        pokemon: pokemon,
        isInmune: true,
        description: "You can't hit it bro",
        damage_range: 0,
        percent_range: [0, 0],
        ko_chance: { chance: 0, n: 0, text: "0%" },
        defender_evs: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
        text_evs: "0 Atk / 0 Def / 0 SpA / 0 SpD / 0 Spe",
        move_category: MOVES[MOVES.length - 1][form.move].category,
      });
      continue;
    }

    //PASOS:
    //2 - el pokemon no tiene un set almacenado
    const setCalc = calculateDamageWithSet(pokemon, form);
    //3 - Añadir set Extremo
    const extremeCalc = calculateExtremeDamage(pokemon, form);
    //4 - Añadir set Óptimo

    //////////////////////////////////////////
    ///////                            ///////
    ///////     OBTENCIÓN DE SET       ///////
    ///////                            ///////
    //////////////////////////////////////////

    i++;
  }
};

const calculateExtremeDamage = async (pokemon: any, form: ReportProps) => {
  try {
    const defensiveData: PokemonData = {
      items: SPECIES[SPECIES.length - 1][pokemon].nfe ? "Eviolite" : "",
      nature: form.category === "Physical" ? "Bold" : "Calm",
      evs: "252/0/252/0/252/0",
    };
    return calculateDamage(form, pokemon, defensiveData);
  } catch (e) {
    console.log("Invalid data", pokemon, e);
    return undefined;
  }
};

const calculateDamageWithSet = async (pokemon: any, form: ReportProps) => {
  try {
    const fetchData = await fetch(
      `https://www.pikalytics.com/api/p/2023-02/gen9vgc2023series2-1760/${pokemon
        .toLowerCase()
        .trim()}`
    );
    const responseData = await fetchData.json();
    const defensiveData: PokemonData = {
      items: responseData.items[0].item,
      nature: responseData.spreads[0].nature,
      evs: responseData.spreads[0].ev ?? "0/0/0/0/0/0",
    };
    return calculateDamage(form, pokemon, defensiveData);
  } catch (e) {
    console.log("Invalid data", pokemon, e);
    return undefined;
  }
};

const calculateDamage = (
  form: ReportProps,
  pokemon: string,
  defensiveData: PokemonData
) => {
  const evSpread = getEvSpread(defensiveData.evs);

  const result = calculate(
    9,
    new Pokemon(Generations.get(9), form.name, {
      item: form.item as any,
      nature: form.nature as any,
      evs: { atk: +form.evAtk, spa: +form.evSpa },
      ivs: { atk: +form.ivAtk, spa: +form.ivSpa },
      boosts: { atk: +form.boostAtk, spa: +form.boostSpa },
    }),
    new Pokemon(Generations.get(9), pokemon, {
      item: defensiveData.items as ItemName,
      nature: defensiveData.nature as NatureName,
      evs: { hp: evSpread.hp, def: evSpread.def, spd: evSpread.spd },
      ivs: { hp: 31, def: 31, spd: 31 },
      boosts: { def: +form.boostDef, spd: +form.boostSpd },
    }),
    new Move(Generations.get(9), form.move)
  );
  const sendData: CalcData = {
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
  return sendData;
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
