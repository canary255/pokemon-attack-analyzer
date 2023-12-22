import { create } from "zustand";
import {
  SetOptions,
  SurvivalOptions,
} from "../molecules/PokemonCalcResultList/interfaces/options";

interface State {
  pokemonName: string;
  setPokemonName: (pokemonName?: string) => void;
  selector: SurvivalOptions;
  setSelector: (selector?: SurvivalOptions) => void;
  pokemonSet: SetOptions;
  setPokemonSet: (pokemonSet?: SetOptions) => void;
}

const useStore = create<State>((set) => ({
  selector: "all",
  setSelector: (selector) => set(() => ({ selector })),
  pokemonSet: "extreme",
  setPokemonSet: (pokemonSet) => set(() => ({ pokemonSet })),
  pokemonName: "",
  setPokemonName: (pokemonName) => set(() => ({ pokemonName })),
}));

export const useFilterStore = () => {
  const store = useStore();

  return store;
};
