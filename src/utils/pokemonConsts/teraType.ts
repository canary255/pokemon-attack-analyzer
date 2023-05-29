export const teraType = [
  { name: "type.normal", value: "normal" },
  { name: "type.fire", value: "fire" },
  { name: "type.water", value: "water" },
  { name: "type.electric", value: "electric" },
  { name: "type.grass", value: "grass" },
  { name: "type.ice", value: "ice" },
  { name: "type.fighting", value: "fighting" },
  { name: "type.poison", value: "poison" },
  { name: "type.ground", value: "ground" },
  { name: "type.flying", value: "flying" },
  { name: "type.psychic", value: "psychic" },
  { name: "type.bug", value: "bug" },
  { name: "type.rock", value: "rock" },
  { name: "type.ghost", value: "ghost" },
  { name: "type.dragon", value: "dragon" },
  { name: "type.dark", value: "dark" },
  { name: "type.steel", value: "steel" },
  { name: "type.fairy", value: "fairy" },
].sort((a, b) => {
  if (a.value > b.value) {
    return 0;
  }
  return -1;
});
