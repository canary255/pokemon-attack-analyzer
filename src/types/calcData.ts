import { StatsTable } from "@smogon/calc";

export enum surviveEnum {
  YES = "yes",
  NO = "no",
  BARELY = "barely",
}

export interface CalcData {
  description: string;
  damage_range: number | number[] | [number[], number[]];
  percent_range: number[];
  ko_chance: { chance?: number; n: number; text: string };
  defender_evs: StatsTable<number>;
  text_evs: string;
  move_category?: string;
}

export interface PokemonCalculatedData {
  pokemon: string;
  isInmmune: boolean;
  calcSet?: CalcData;
  calcExtreme: CalcData;
  img: string | void;
}
