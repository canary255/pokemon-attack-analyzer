import { ReportProps } from "../../types/reportProps";
import { getCompleteDexNames } from "../pokemonConsts/lists";
import React, { SetStateAction } from "react";
import { PokemonCalculatedData } from "../../types/calcData";
import { CalcList } from "../../types/calcList";
import { getPokemonSprite } from "../getPokemonSprite";
import { getCancelAction, setCancelAction } from "../cancelAction";
import { PokemonData } from "../../types/gen9Pokedex";
import {
  getGen9PokemonDefensiveDataList,
  getGen9PokemonNames,
} from "../../adapter/gen9";
import { MOVES, SPECIES, TYPE_CHART } from "@smogon/calc";
import { TypeName } from "@smogon/calc/dist/data/interface";
import { inmmunePokemon } from "./utils/inmmunePokemon";
import { EXTREME_EV_SPREAD, INMMUNE_POKEMON_SET } from "../consts";
import { nameConverter } from "../pokemonNameConverter";
import { TypeChart } from "@smogon/calc/dist/data/types";
import { calculateDamage } from "./calculate";

const defensivePokemonList = getGen9PokemonDefensiveDataList();

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

    try {
      const pokemonType: [TypeName, TypeName?] =
        SPECIES[SPECIES.length - 1][normalizedPokemon].types;
      const typeValue: TypeChart = TYPE_CHART[TYPE_CHART.length - 1];

      //1 - add type immunity
      if (
        !form.foresight &&
        (typeValue?.[moveType]?.[pokemonType[0]] === 0 ||
          (pokemonType[1] && typeValue?.[moveType]?.[pokemonType[1]] === 0))
      ) {
        calcsList.push(await inmmunePokemon(pokemon));
        i++;
        continue;
      }

      //STEPS:
      //2 - The pokemon has a set stored in the json file
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
        img:
          getPokemonImageFromJson ??
          (await getPokemonSprite(
            normalizedPokemon.replace(/[\u0300-\u036f]/g, "")
          )),
      });
    } catch (error) {
      console.log(error);
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
  //Set obtention
  const defensiveData = defensivePokemonList.get(pokemon);
  if (!defensiveData) return undefined;
  return calculateDamage(form, pokemon, defensiveData);
};
