import { Sprite } from "../../atom/Sprite/Sprite";
import { TextFieldCommon } from "../../atom/TextFieldCommon/TextFieldCommon";
import { TextField } from "../../atom/Textfield/TextField";
import { CalcList } from "../../types/calcList";
import { COLOR } from "../../utils/color";

type PokemonCalcResultProps = {
  resultsCalcs: CalcList[];
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

export const PokemonCalcResult = ({ resultsCalcs }: PokemonCalcResultProps) => {
  return (
    <div className="border-t border-b border-black">
      <div className="flex justify-center mt-2">
        <TextFieldCommon width="L" />
      </div>
      <div className="grid grid-cols-5 gap-y-10 max-h-96 overflow-auto p-6">
        {resultsCalcs.map((item, index) => {
          return (
            <Sprite
              key={index}
              src={item?.img}
              pokemonName={item?.pokemon}
              className={`${survivalColor(
                item?.calcExtreme?.ko_chance
              )} w-[72px] cursor-pointer`}
            />
          );
        })}
      </div>
    </div>
  );
};
