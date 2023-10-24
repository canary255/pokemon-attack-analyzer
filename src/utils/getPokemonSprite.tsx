import { nameConverter } from "./pokemonNameConverter";

export async function getPokemonSprite(name: string) {
  var pokemonName = nameConverter(name).toLowerCase().trim().replace(" ", "-");
  var url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;

  return await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const frontSprite = data.sprites.front_default;
      return frontSprite;
    })
    .catch((error) => console.error(error));
}
