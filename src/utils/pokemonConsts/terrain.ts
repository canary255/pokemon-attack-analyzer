import { Terrain } from "@smogon/calc/dist/data/interface";

type TerrainProps = {
  name: string;
  value: "none" | Terrain;
};

export const terrain: TerrainProps[] = [
  { name: "common.none", value: "none" },
  { name: "terrain.electric", value: "Electric" },
  { name: "terrain.grassy", value: "Grassy" },
  { name: "terrain.misty", value: "Misty" },
  { name: "terrain.psychic", value: "Psychic" },
];
