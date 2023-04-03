import { Pokemon } from "../utils/calc";
import { CalcData } from "./calcData";

export interface CalcList {
  pokemon: string;
  isInmune: boolean;
  calcSet?: CalcData;
  calcExtreme?: CalcData;
  img?: string;
}
