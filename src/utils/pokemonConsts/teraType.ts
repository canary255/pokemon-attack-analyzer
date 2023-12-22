import { TypeName } from "@smogon/calc/dist/data/interface";

type TypeProps = {
  name: string;
  value: TypeName;
};

const teraType: TypeProps[] = [
  { name: "type.normal", value: "Normal" },
  { name: "type.fire", value: "Fire" },
  { name: "type.water", value: "Water" },
  { name: "type.electric", value: "Electric" },
  { name: "type.grass", value: "Grass" },
  { name: "type.ice", value: "Ice" },
  { name: "type.fighting", value: "Fighting" },
  { name: "type.poison", value: "Poison" },
  { name: "type.ground", value: "Ground" },
  { name: "type.flying", value: "Flying" },
  { name: "type.psychic", value: "Psychic" },
  { name: "type.bug", value: "Bug" },
  { name: "type.rock", value: "Rock" },
  { name: "type.ghost", value: "Ghost" },
  { name: "type.dragon", value: "Dragon" },
  { name: "type.dark", value: "Dark" },
  { name: "type.steel", value: "Steel" },
  { name: "type.fairy", value: "Fairy" },
  //{ name: "type.stellar", value: "Stellar" },
];

export default teraType.sort((a, b) => {
  if (a.value > b.value) {
    return 0;
  }
  return -1;
});
