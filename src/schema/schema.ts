import { Mechanic } from "../types/mechanic";
import { ReportProps } from "../types/reportProps";

export const reportInitialState: ReportProps = {
  name: "Abra",
  teraType: "Normal",
  ability: "Absorb",
  nature: "modest",
  item: "",
  move: "Absorb",
  mechanic: Mechanic.none,
  category: "Special",
  crit: false,
  boostAtk: "0",
  evAtk: "0",
  ivAtk: "31",
  boostSpa: "0",
  evSpa: "0",
  ivSpa: "31",
  target: "Singles",
  selectPokemon: "vgc",
  defenderList: "",
  boostDef: "0",
  boostSpd: "0",
  weather: "none",
  terrain: "none",
  fairy: false,
  dark: false,
  break: false,
  spikes: "0",
  helpingHand: false,
  gravity: false,
  protect: false,
  stealthRock: false,
  foresight: false,
  reflect: false,
  lightScreen: false,
  auroraVeil: false,
  battery: false,
  friendGuard: false,
  tailwind: false,
  vessel: false,
  tablets: false,
  sword: false,
  beads: false,
  hits: "",
  avatar: "",
  av: false,
  level: "50",
  status: "",
};

export const testingSet: ReportProps = {
  name: "Porygon-Z",
  teraType: "Normal",
  ability: "Adaptability",
  nature: "modest",
  item: "Choice Scarf",
  move: "Hyper Beam",
  mechanic: Mechanic.terastal,
  category: "Special",
  crit: false,
  boostAtk: "0",
  evAtk: "0",
  ivAtk: "31",
  boostSpa: "0",
  evSpa: "252",
  ivSpa: "31",
  target: "Singles",
  selectPokemon: "all",
  defenderList: "",
  boostDef: "0",
  boostSpd: "0",
  weather: "none",
  terrain: "none",
  fairy: false,
  dark: false,
  break: false,
  spikes: "0",
  helpingHand: false,
  gravity: false,
  protect: false,
  stealthRock: false,
  foresight: false,
  reflect: false,
  lightScreen: false,
  auroraVeil: false,
  battery: false,
  friendGuard: false,
  tailwind: false,
  vessel: false,
  tablets: false,
  sword: false,
  beads: false,
  hits: "",
  av: false,
  level: "50",
  avatar:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/474.png",
  status: "",
};
