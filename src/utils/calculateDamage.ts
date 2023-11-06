import { ReportProps } from "../types/reportProps";
import { getCompleteDexNames } from "./pokemonConsts/lists";
import React, { SetStateAction } from "react";
import {
  CalcData,
  PokemonCalculatedData,
  surviveEnum,
} from "../types/calcData";
import { CalcList } from "../types/calcList";
import { getPokemonSprite } from "./getPokemonSprite";
import { getCancelAction, setCancelAction } from "./cancelAction";
import { PokemonData } from "../types/gen9Pokedex";
import {
  getGen9PokemonDefensiveDataList,
  getGen9PokemonNames,
} from "../adapter/gen9";
import { MOVES, SPECIES, TYPE_CHART, Generations, Field } from "@smogon/calc";
import { Pokemon } from "@smogon/calc/dist/pokemon";
import {
  AbilityName,
  GameType,
  ItemName,
  MoveCategory,
  NatureName,
  Terrain,
  TypeName,
  Weather,
} from "@smogon/calc/dist/data/interface";
import { Move } from "@smogon/calc/dist/move";
import { calculate } from "@smogon/calc/dist/calc";
import { inmmunePokemon } from "./calculateDamage/inmmunePokemon";
import { EXTREME_EV_SPREAD, INMMUNE_POKEMON_SET } from "./consts";
import { nameConverter } from "./pokemonNameConverter";
import { TypeChart } from "@smogon/calc/dist/data/types";

const defensivePokemonList = getGen9PokemonDefensiveDataList();
const MAX_IV = 31;

const canSurvive = (ko_chance?: {
  chance?: number;
  n: number;
  text: string;
}) => {
  if (!ko_chance || !ko_chance.chance) return surviveEnum.YES;
  if (ko_chance.chance === 1 && ko_chance.n === 1) return surviveEnum.NO;
  if (ko_chance.chance < 1 && ko_chance.n === 1) return surviveEnum.BARELY;
  return surviveEnum.YES;
};

export const loadDataCalculator = async (
  form: ReportProps,
  setNumberDex: React.Dispatch<SetStateAction<number>>,
  setTotalDex: React.Dispatch<SetStateAction<number>>,
  setPage: React.Dispatch<SetStateAction<number>>,
  setResultCalcs: React.Dispatch<SetStateAction<CalcList[]>>
) => {
  const dex =
    form.selectPokemon === "all"
      ? getCompleteDexNames()
      : getGen9PokemonNames();

  setTotalDex(dex.length);
  const calcsList: PokemonCalculatedData[] = [];
  const moveType: TypeName =
    form.move === "Tera Blast" && form.mechanic === "tera"
      ? form.teraType
      : MOVES[MOVES.length - 1][form.move].type;

  let i = 1;
  for (const pokemon of dex) {
    const normalizedPokemon = pokemon.normalize("NFD");
    const getPokemonImageFromJson = defensivePokemonList.get(
      nameConverter(normalizedPokemon)
    )?.img;

    const isCancelledAction = getCancelAction();
    if (isCancelledAction) {
      setPage((prev) => {
        return prev - 1;
      });
      setCancelAction();
      return;
    }
    //Uncomment for testing
    //if (i === 30) break;
    setNumberDex(i);
    const pokemonType: [TypeName, TypeName?] =
      SPECIES[SPECIES.length - 1][normalizedPokemon].types;
    const typeValue: TypeChart = TYPE_CHART[TYPE_CHART.length - 1];

    //1 - add type immunity
    if (
      typeValue?.[moveType]?.[pokemonType[0]] === 0 ||
      (pokemonType[1] && typeValue?.[moveType]?.[pokemonType[1]] === 0)
    ) {
      calcsList.push(await inmmunePokemon(pokemon));
      i++;
      continue;
    }

    try {
      //STEPS:
      //2 - The pokemon has a set stored
      const setCalc = calculateDamageWithSet(normalizedPokemon, form);
      //3 - Add extreme set
      const extremeCalc = calculateExtremeDamage(normalizedPokemon, form);
      //4 - Add optimal set
      //const optimalCalc = calculateOptimalDamage(pokemon, form);

      calcsList.push({
        pokemon: pokemon,
        isInmmune: false,
        calcSet: setCalc,
        calcExtreme: extremeCalc,
        canSurvive: canSurvive(extremeCalc?.ko_chance),
        img:
          getPokemonImageFromJson ??
          (await getPokemonSprite(
            normalizedPokemon.replace(/[\u0300-\u036f]/g, "")
          )),
      });
    } catch (error) {
      calcsList.push(await inmmunePokemon(pokemon));
    } finally {
      i++;
    }
  }
  setPage((prev) => {
    return prev + 1;
  });
  setResultCalcs(calcsList as any);
};

const calculateExtremeDamage = (pokemon: string, form: ReportProps) => {
  try {
    const defensiveData: PokemonData = {
      item: SPECIES[SPECIES.length - 1][pokemon].nfe ? "Eviolite" : "",
      nature: form.category === "Physical" ? "Bold" : "Calm",
      evs: EXTREME_EV_SPREAD,
    };
    return calculateDamage(form, pokemon, defensiveData);
  } catch (e) {
    return INMMUNE_POKEMON_SET;
  }
};

const calculateDamageWithSet = (pokemon: string, form: ReportProps) => {
  //////////////////////////////////////////
  ///////                            ///////
  ///////       SET OBTENTION        ///////
  ///////                            ///////
  //////////////////////////////////////////
  const defensiveData = defensivePokemonList.get(pokemon);
  if (!defensiveData) return undefined;
  return calculateDamage(form, pokemon, defensiveData);
};

const calculateDamage = (
  form: ReportProps,
  pokemon: string,
  defensiveData: PokemonData
) => {
  const evSpread = getEvSpread(defensiveData.evs);
  const LEVEL = 50;

  const ATTACKER = new Pokemon(Generations.get(9), form.name, {
    item: form.item as ItemName,
    nature: form.nature as NatureName,
    evs: { atk: +form.evAtk, spa: +form.evSpa },
    ivs: { atk: +form.ivAtk, spa: +form.ivSpa },
    boosts: { atk: +form.boostAtk, spa: +form.boostSpa },
    level: LEVEL,
    ability: form.ability as AbilityName,
    teraType: form.mechanic === "tera" ? form.teraType : undefined,
  });

  const DEFENDER = new Pokemon(Generations.get(9), pokemon, {
    item: defensiveData.item as ItemName,
    nature: defensiveData.nature as NatureName,
    evs: { hp: evSpread.hp, def: evSpread.def, spd: evSpread.spd },
    ivs: { hp: MAX_IV, def: MAX_IV, spd: MAX_IV },
    boosts: { def: +form.boostDef, spd: +form.boostSpd },
    level: LEVEL,
  });

  const MOVE = new Move(Generations.get(9), form?.move, {
    ability: form?.ability as AbilityName,
    item: form?.item as ItemName,
    isCrit: form?.crit,
    hits: Number(form?.hits),
    useZ: form?.mechanic === "zMove",
    useMax: form?.mechanic === "dynamax",
    overrides: { category: form?.category as MoveCategory },
  });

  const FIELD = new Field({
    isGravity: form.gravity,
    terrain: form.terrain as Terrain,
    isBeadsOfRuin: form.beads,
    isSwordOfRuin: form.sword,
    isTabletsOfRuin: form.tablets,
    isVesselOfRuin: form.vessel,
    weather: form.weather as Weather,
    isAuraBreak: form.break,
    isFairyAura: form.fairy,
    isDarkAura: form.dark,
    gameType: form.target as GameType,
    defenderSide: {
      isAuroraVeil: form.auroraVeil,
      isBattery: form.battery,
      isFriendGuard: form.friendGuard,
      isReflect: form.reflect,
      isLightScreen: form.lightScreen,
      //isTailwind: form.tailwind,
      spikes: +form.spikes,
      isProtected: form.protect,
      isSR: form.stealthRock,
      isForesight: form.foresight,
    },
    attackerSide: {
      isHelpingHand: form.helpingHand,
      isTailwind: form.tailwind,
    },
  });

  const result = calculate(Generations.get(9), ATTACKER, DEFENDER, MOVE, FIELD);
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
  return sendData as CalcData;
};

const getEvSpread = (spread: string) => {
  const evs = spread.split("/");
  const evSpread = {
    hp: Number(evs[0]),
    atk: Number(evs[1]),
    def: Number(evs[2]),
    spa: Number(evs[3]),
    spd: Number(evs[4]),
    spe: Number(evs[5]),
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
