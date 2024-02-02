import { PokeAPIProps } from "../types/pokeAPIProps";
import { getAvatarUrl } from "./getAvatarUrl";
import { nameConverter } from "./pokemonNameConverter";

export async function getPokemonSprite(name: string) {
  var pokemonName = nameConverter(name).toLowerCase().trim().replace(" ", "-");
  var url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;

  try {
    const request = await fetch(url);
    if (request.status === 200) {
      const data: PokeAPIProps = await request.json();
      const frontSprite = getAvatarUrl(name, data);
      return frontSprite;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }

  return undefined;
}
