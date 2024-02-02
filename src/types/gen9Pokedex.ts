export type Pokedex = Pokemon[];

export interface Pokemon {
  name: string;
  item?: string;
  evs?: string;
  nature?: string;
  rank?: string;
  search?: string;
  raw?: string;
  percent?: string;
  types?: string[];
  name_trans?: string;
  l?: string;
  ss?: boolean;
  id?: number;
  img?: string | null;
}

export interface PokemonData {
  item: string;
  evs: string;
  nature: string;
  img?: string;
}
