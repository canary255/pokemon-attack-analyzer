export const COLOR = {
  red: "bg-red-300",
  green: "bg-green-200",
  yellow: "bg-yellow-300",
};

export const survivalColor = (
  ko_chance:
    | {
        chance?: number;
        n: number;
        text: string;
      }
    | undefined
) => {
  if (!ko_chance || ko_chance.chance === undefined) return COLOR["green"];
  if (ko_chance.chance === 1 && ko_chance.n === 1) return COLOR["red"];
  if (ko_chance.chance < 1 && ko_chance.n === 1) return COLOR["yellow"];
  return COLOR["green"];
};
