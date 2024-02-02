export const getEvsText = (evs: { [key: string]: number }) => {
  return `${evs.hp}/${evs.atk}/${evs.def}/${evs.spa}/${evs.spd}/${evs.spe}`;
};
