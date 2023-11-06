export const getEvSpread = (spread: string) => {
  const evs = spread.split("/");
  const evSpread = {
    hp: Number(evs[0]),
    atk: Number(evs[1]),
    def: Number(evs[2]),
    spa: Number(evs[3]),
    spd: Number(evs[4]),
    spe: Number(evs[5]),
  };
  return evSpread;
};
