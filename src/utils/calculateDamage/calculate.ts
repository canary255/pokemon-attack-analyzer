import { Field, Generations, Move, Pokemon, calculate } from "@smogon/calc";
import { CalcData } from "../../types/calcData";
import { getEvSpread, getEvsText, getPercentDamage } from "./utils";
import { ReportProps } from "../../types/reportProps";
import { PokemonData } from "../../types/gen9Pokedex";
import {
  AbilityName,
  GameType,
  ItemName,
  MoveCategory,
  NatureName,
  Terrain,
  Weather,
} from "@smogon/calc/dist/data/interface";
import { MAX_IV } from "../consts";

export const calculateDamage = (
  form: ReportProps,
  pokemon: string,
  defensiveData: PokemonData
) => {
  const evSpread = getEvSpread(defensiveData.evs);
  const LEVEL = Number(form.level);

  const ATTACKER = new Pokemon(Generations.get(9), form.name, {
    item: form.item as ItemName,
    nature: form.nature as NatureName,
    evs: { atk: Number(form.evAtk), spa: Number(form.evSpa) },
    ivs: { atk: Number(form.ivAtk), spa: Number(form.ivSpa) },
    boosts: { atk: Number(form.boostAtk), spa: Number(form.boostSpa) },
    level: LEVEL,
    ability: form.ability as AbilityName,
    teraType: form.mechanic === "tera" ? form.teraType : undefined,
  });

  const DEFENDER = new Pokemon(Generations.get(9), pokemon, {
    item: form.av ? "Assault Vest" : (defensiveData.item as ItemName),
    nature: defensiveData.nature as NatureName,
    evs: { hp: evSpread.hp, def: evSpread.def, spd: evSpread.spd },
    ivs: { hp: MAX_IV, def: MAX_IV, spd: MAX_IV },
    boosts: { def: Number(form.boostDef), spd: Number(form.boostSpd) },
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
      isFriendGuard: form.friendGuard,
      isReflect: form.reflect,
      isLightScreen: form.lightScreen,
      //isTailwind: form.tailwind,
      spikes: Number(form.spikes),
      isProtected: form.protect,
      isSR: form.stealthRock,
      isForesight: form.foresight,
    },
    attackerSide: {
      isHelpingHand: form.helpingHand,
      isTailwind: form.tailwind,
      isBattery: form.battery,
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
