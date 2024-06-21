import { Button } from "../../atom/Button/Button";
import { Sprite } from "../../atom/Sprite/Sprite";
import { Text } from "../../atom/Text/Text";
import { useFilterStore } from "../../hooks/useFilterStore";
import { useResultsStore } from "../../hooks/useResultsStore";
import { CalcData } from "../../types/calcData";
import { survivalColor } from "../../utils/color";

export const PokemonCalcInfo = () => {
  const { pokemonInfo, setPokemonInfo } = useResultsStore();
  const { pokemonSet } = useFilterStore();

  const PokemonInfoCard = ({
    pokemonInfo,
    title,
  }: {
    pokemonInfo: CalcData;
    title: string;
  }) => {
    return (
      <div
        className={`${survivalColor(pokemonInfo?.ko_chance)}
          p-3 rounded-xl shadow-md`}
      >
        <Text className="text-lg !text-gray-800 font-bold">{title}</Text>
        <Text className="!text-gray-800 font-semibold">
          {pokemonInfo?.description}
        </Text>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full gap-y-4">
      <Button
        name="back"
        onClick={() => setPokemonInfo(undefined)}
        label="back"
        className="rounded-xl w-24 text-xl"
      />
      <div className="flex flex-col gap-y-6 overflow-auto px-10 bg-gray-100 dark:bg-gray-600 shadow-custom-medium rounded-lg py-4">
        <div className="flex flex-row gap-x-8 items-center">
          <Sprite
            src={pokemonInfo?.img}
            pokemonName={pokemonInfo?.pokemon}
            className={`${survivalColor(
              pokemonInfo?.[
                pokemonSet === "extreme" ? "calcExtreme" : "calcSet"
              ]?.ko_chance
            )} w-[6rem]`}
          />
          <Text className="text-2xl font-semibold dark:text-shadow-sm">
            {pokemonInfo?.pokemon}
          </Text>
        </div>

        <div className="flex flex-col gap-y-3">
          {pokemonInfo?.calcSet && (
            <PokemonInfoCard
              pokemonInfo={pokemonInfo?.calcSet}
              title={`Pokémon with set case: ${pokemonInfo?.calcSet?.text_evs}`}
            />
          )}

          {pokemonInfo?.calcExtreme && (
            <PokemonInfoCard
              pokemonInfo={pokemonInfo?.calcExtreme}
              title="Extreme case"
            />
          )}
        </div>
      </div>
    </div>
  );
};
