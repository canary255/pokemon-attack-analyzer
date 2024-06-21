import { PokeAPIProps } from "../types/pokeAPIProps";
import { nameConverter } from "../utils/pokemonNameConverter";
import { useCustomSWR } from "./useCustomSWR";

const updateStats = ({
  data,
  newStats,
}: {
  data?: PokeAPIProps;
  newStats: PokeAPIProps["stats"];
}) => {
  if (data) {
    data.stats = newStats;
  }
};

export const usePokeapiData = (specie: string) => {
  const { data, error, isLoading, mutate } = useCustomSWR<PokeAPIProps>({
    url:
      specie !== ""
        ? `https://pokeapi.co/api/v2/pokemon/${nameConverter(specie)
            .replace(" ", "-")
            .toLowerCase()}`
        : null,
  });

  if (data?.name.toLowerCase() === "terapagos-stellar") {
    //TODO: REMOVE IT WHEN TERAPAGOS-STELLAR DATA IS UPDATED
    const newStats = [...data.stats];
    newStats[0].base_stat = 160;
    newStats[1].base_stat = 105;
    newStats[2].base_stat = 110;
    newStats[3].base_stat = 130;
    newStats[4].base_stat = 110;
    newStats[5].base_stat = 85;
    updateStats({ data, newStats });
  }
  return { data, error, isLoading, mutate };
};
