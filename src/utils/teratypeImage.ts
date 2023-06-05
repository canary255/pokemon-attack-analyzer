import bug from "../assets/teraType/bug.png";
import normal from "../assets/teraType/normal.png";
import fire from "../assets/teraType/fire.png";
import water from "../assets/teraType/water.png";
import electric from "../assets/teraType/electric.png";
import grass from "../assets/teraType/grass.png";
import ice from "../assets/teraType/ice.png";
import fighting from "../assets/teraType/fighting.png";
import poison from "../assets/teraType/poison.png";
import ground from "../assets/teraType/ground.png";
import flying from "../assets/teraType/flying.png";
import psychic from "../assets/teraType/psychic.png";
import rock from "../assets/teraType/rock.png";
import ghost from "../assets/teraType/ghost.png";
import dragon from "../assets/teraType/dragon.png";
import dark from "../assets/teraType/dark.png";
import steel from "../assets/teraType/steel.png";
import fairy from "../assets/teraType/fairy.png";
import { TypeName } from "./calc/data/interface";

type Teratype = Exclude<TypeName, "Normal" | "???">;

const teratypeImages: Record<Teratype, string> = {
  Bug: bug,
  Fire: fire,
  Water: water,
  Electric: electric,
  Grass: grass,
  Ice: ice,
  Fighting: fighting,
  Poison: poison,
  Ground: ground,
  Flying: flying,
  Psychic: psychic,
  Rock: rock,
  Ghost: ghost,
  Dragon: dragon,
  Dark: dark,
  Steel: steel,
  Fairy: fairy,
};

export const teratypeImage = (type: Teratype): string => {
  return teratypeImages[type] || normal;
};
