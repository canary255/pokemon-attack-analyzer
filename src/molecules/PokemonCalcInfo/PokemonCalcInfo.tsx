import { Button } from "../../atom/Button/Button";
import { Sprite } from "../../atom/Sprite/Sprite";
import { Text } from "../../atom/Text/Text";
import { useFilterStore } from "../../hooks/useFilterStore";
import { useResultsStore } from "../../hooks/useResultsStore";
import { survivalColor } from "../../utils/color";

export const PokemonCalcInfo = () => {
  const { pokemonInfo, setPokemonInfo } = useResultsStore();
  const { pokemonSet } = useFilterStore();

  return (
    <>
      <Button
        name="back"
        onClick={() => setPokemonInfo(undefined)}
        label="back"
        className="rounded-xl w-24 ml-4 mb-2"
      />
      <div className="flex flex-col gap-y-6 max-h-96 overflow-auto px-6">
        <div className="flex flex-row gap-x-8 p-4 items-center">
          <Sprite
            src={pokemonInfo?.img}
            pokemonName={pokemonInfo?.pokemon}
            className={`${survivalColor(
              pokemonInfo?.[
                pokemonSet === "extreme" ? "calcExtreme" : "calcSet"
              ]?.ko_chance
            )} w-[72px]`}
          />
          <Text className="text-lg font-semibold">{pokemonInfo?.pokemon}</Text>
        </div>

        <div className="flex flex-col gap-y-3">
          {pokemonInfo?.calcSet && (
            <div
              className={`${survivalColor(pokemonInfo?.calcSet?.ko_chance)}
          p-3 ml-4 mr-4 rounded-xl shadow-md`}
            >
              <Text className="font-bold">
                Pokémon with set case: {pokemonInfo.calcSet.text_evs}
              </Text>
              <Text className="dark:text-shadow-sm dark:shadow-black dark:font-bold">
                {pokemonInfo.calcSet.description}
              </Text>
            </div>
          )}

          {pokemonInfo?.calcExtreme && (
            <div
              className={`${survivalColor(pokemonInfo?.calcExtreme?.ko_chance)}
          p-3 ml-4 mr-4 rounded-xl shadow-md`}
            >
              <Text className="font-bold">Extreme case:</Text>
              <Text className="dark:text-shadow-sm dark:shadow-black dark:font-bold">
                {pokemonInfo.calcExtreme.description}
              </Text>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
