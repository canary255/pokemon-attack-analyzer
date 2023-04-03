import { Sprite } from "../../atom/Sprite/Sprite";
import { TextFieldCommon } from "../../atom/TextFieldCommon/TextFieldCommon";
import { TextField } from "../../atom/Textfield/TextField";
import { COLOR } from "../../utils/color";

type PokemonCalcResultProps = {};

const test = [
  { example: "test" },
  { example: "test" },
  { example: "test" },
  { example: "test" },
  { example: "test" },
  { example: "test" },
  { example: "test" },
  { example: "test" },
  { example: "test" },
  { example: "test" },
  { example: "test" },
  { example: "test" },
  { example: "test" },
  { example: "test" },
  { example: "test" },
  { example: "test" },
  { example: "test" },
];

const color = ["red", "yellow", "green"];

export const PokemonCalcResult = () => {
  return (
    <div className="border-t border-b border-black">
      <div className="flex justify-center mt-2">
        <TextFieldCommon width="L" />
      </div>
      <div className="grid grid-cols-5 gap-y-10 max-h-96 overflow-auto p-6">
        {test.map((item, index) => {
          return <Sprite src="" className={``} />;
        })}
      </div>
    </div>
  );
};
