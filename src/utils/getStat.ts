import { getBoostMultiplier } from "./boostMultiplier";
import {
  getNatureMultiplier,
  getPhysicalNatureMultiplier,
  getSpecialNatureMultiplier,
  getSpeedNatureMultiplier,
} from "./getNatureMultiplier";

export const getStat = (
  base: string,
  ev: string,
  iv: string,
  boost: string,
  nature: string,
  evName: string,
  level: string
) => {
  const natureMultiplier = getNatureMultiplier(evName, nature);

  const baseInt = Number(base);
  let evInt = Number(ev);
  if (evInt > 252) evInt = 252;
  if (evInt < 0) evInt = 0;

  let ivInt = Number(iv);
  if (ivInt > 31) ivInt = 31;
  if (ivInt < 0) ivInt = 0;
  const boostMultiplier = getBoostMultiplier(boost);
  const LEVEL = Number(level);

  const stat = Math.floor(
    (Math.floor(((2 * baseInt + ivInt + evInt / 4) * LEVEL) / 100) + 5) *
      natureMultiplier *
      boostMultiplier
  );

  return stat.toString();
};
