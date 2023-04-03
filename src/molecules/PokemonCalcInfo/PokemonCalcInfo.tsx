import { Button } from "../../atom/Button/Button";
import { Sprite } from "../../atom/Sprite/Sprite";
import { Text } from "../../atom/Text/Text";
import { TextFieldCommon } from "../../atom/TextFieldCommon/TextFieldCommon";
import { CalcList } from "../../types/calcList";
import { COLOR } from "../../utils/color";

type PokemonCalcResultProps = {
  pokemonInfo: CalcList | undefined;
  setPokemonInfo: React.Dispatch<React.SetStateAction<CalcList | undefined>>;
};

const survivalColor = (
  ko_chance:
    | {
        chance?: number;
        n: number;
        text: string;
      }
    | undefined
) => {
  if (!ko_chance || ko_chance.chance === undefined) return "";
  if (ko_chance.chance === 1 && ko_chance.n === 1) return COLOR["red"];
  if (ko_chance.chance < 1 && ko_chance.n === 1) return COLOR["yellow"];
  return COLOR["green"];
};

export const PokemonCalcInfo = ({
  pokemonInfo,
  setPokemonInfo,
}: PokemonCalcResultProps) => {
  return (
    <>
      <div className="flex flex-col">
        <Button
          name="back"
          onClick={() => setPokemonInfo(undefined)}
          label="back"
          className="rounded-xl w-24 ml-4"
        />
        <div className="flex flex-row gap-x-8 p-4 items-center">
          <Sprite
            src={pokemonInfo?.img}
            pokemonName={pokemonInfo?.pokemon}
            className={`${survivalColor(
              pokemonInfo?.calcExtreme?.ko_chance
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
              <Text className="font-bold">Pokémon with set case:</Text>
              <Text>{pokemonInfo.calcSet.description}</Text>
            </div>
          )}

          {pokemonInfo?.calcExtreme && (
            <div
              className={`${survivalColor(pokemonInfo?.calcExtreme?.ko_chance)}
          p-3 ml-4 mr-4 rounded-xl shadow-md`}
            >
              <Text className="font-bold">Extreme case:</Text>
              <Text>{pokemonInfo.calcExtreme.description}</Text>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
