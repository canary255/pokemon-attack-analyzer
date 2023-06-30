export type Pokedex = Pokemon[];

export interface Pokemon {
  name: string;
  rank: string;
  search?: string;
  raw: string;
  percent: string;
  types?: string[];
  ss?: boolean;
  id?: number;
  name_trans?: string;
  l: string;
  stats?: Stats;
  abilities?: Ability[];
  raw_count?: string;
  ranking?: string;
  viability?: string;
  items?: Item[];
  spreads?: Spread[];
  moves?: Mfe[];
  team?: Team[];
}

export interface Stats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

export interface Ability {
  ability: string;
  percent: string;
}

export interface Item {
  item: string;
  item_us: string;
  percent: string;
}

export interface Spread {
  nature: string;
  ev: string;
  percent: string;
}

export interface Mfe {
  move: string;
  percent: string;
  type?: string;
}

export interface Team {
  pokemon: string;
  percent: string;
  types: string[];
  pokemon_trans: string;
  l: string;
  ss?: boolean;
  id?: number;
}

export interface PokemonData {
  item: string;
  evs: string;
  nature: string;
}
