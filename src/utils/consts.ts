import { CalcData } from "../types/calcData";

export const EXTREME_EV_SPREAD = "252/0/252/0/252/0";
export const MIN_EV_SPREAD = "0/0/0/0/0/0";

export const MAX_IV = 31;

export const INMMUNE_POKEMON_SET: CalcData = {
  description: "You can't hit it bro",
  damage_range: 0,
  percent_range: [0, 0],
  ko_chance: { chance: 0, n: 0, text: "0%" },
  defender_evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  text_evs: MIN_EV_SPREAD,
};
