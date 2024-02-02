import { create } from "zustand";
import { CalcList } from "../types/calcList";

interface State {
  pokemonInfo?: CalcList;
  setPokemonInfo: (pokemonInfo?: CalcList) => void;
  lastScrollPosition: number;
  setLastScrollPosition: (position?: number) => void;
}

const useStore = create<State>((set) => ({
  pokemonInfo: undefined,
  setPokemonInfo: (pokemonInfo) => set(() => ({ pokemonInfo })),
  lastScrollPosition: 0,
  setLastScrollPosition: (position) =>
    set(() => ({ lastScrollPosition: position })),
}));

export const useResultsStore = () => {
  const store = useStore();

  return store;
};
