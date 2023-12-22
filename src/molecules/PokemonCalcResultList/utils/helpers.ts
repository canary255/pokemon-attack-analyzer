import { CalcData, surviveEnum } from "../../../types/calcData";

export const canSurvive = (set?: CalcData) => {
  if (!set || !set.ko_chance || !set.ko_chance.chance) return surviveEnum.YES;
  if (set.ko_chance.chance === 1 && set.ko_chance.n === 1)
    return surviveEnum.NO;
  if (set.ko_chance.chance < 1 && set.ko_chance.n === 1)
    return surviveEnum.BARELY;
  return surviveEnum.YES;
};
