import {
  StatusName,
  Terrain,
  TypeName,
  Weather,
} from "@smogon/calc/dist/data/interface";
import { Mechanic } from "./mechanic";

export type ReportProps = {
  name: string;
  teraType: TypeName;
  ability: string;
  nature: string;
  item: string;
  move: string;
  category: string;
  mechanic: Mechanic;
  crit: boolean;
  boostAtk: string;
  evAtk: string;
  ivAtk: string;
  boostUserDef: string;
  evUserDef: string;
  ivUserDef: string;
  boostSpa: string;
  evSpa: string;
  ivSpa: string;
  boostSpe: string;
  evSpe: string;
  ivSpe: string;
  target: "Singles" | "Doubles";
  selectPokemon: "all" | "vgc";
  defenderList: string;
  boostDef: string;
  boostSpd: string;
  weather: "none" | Weather;
  terrain: "none" | Terrain;
  fairy: boolean;
  dark: boolean;
  break: boolean;
  spikes: string;
  helpingHand: boolean;
  gravity: boolean;
  protect: boolean;
  stealthRock: boolean;
  foresight: boolean;
  reflect: boolean;
  lightScreen: boolean;
  auroraVeil: boolean;
  battery: boolean;
  friendGuard: boolean;
  tailwind: boolean;
  vessel: boolean;
  tablets: boolean;
  sword: boolean;
  beads: boolean;
  hits: string;
  avatar: string;
  level: string;
  av: boolean;
  status: "" | StatusName;
};
