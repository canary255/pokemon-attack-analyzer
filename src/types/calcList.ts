import { CalcData } from "./calcData";

export interface CalcList {
  pokemon: string;
  isInmune: boolean;
  calcSet?: CalcData;
  calcExtreme?: CalcData;
  canSurvive: "yes" | "barely" | "no";
  img?: string;
}
