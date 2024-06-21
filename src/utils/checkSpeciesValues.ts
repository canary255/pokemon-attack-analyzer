export const checkSpeciesValues = (
  pokemon: string,
  watch: any,
  setValue: any
) => {
  const pokemonLower = pokemon.toLowerCase();
  if (pokemonLower === "terapagos-terastal") {
    if (watch("mechanic") === "tera") {
      setValue("mechanic", "none");
    }
  }
  if (pokemonLower === "terapagos-stellar") {
    setValue("mechanic", "tera");
    setValue("teraType", "Stellar");
  }
};
