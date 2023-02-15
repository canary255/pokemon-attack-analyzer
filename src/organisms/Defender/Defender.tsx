import { useTranslation } from "react-i18next";
import {
  nature,
  mechanic,
  category,
  selectPokemon,
  target,
  boost,
} from "../../utils/pokemonConsts";
import { RadioGroupUI } from "../../atom/RadioGroup/RadioGroup";
import { TextField } from "../../atom/Textfield/TextField";
import { SelectorUI } from "../../atom/Selector/Selector";

export const Defender = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col">
        <div className="mt-5 grid place-items-center">
          <RadioGroupUI name="selectPokemon" options={selectPokemon} />
        </div>
        <div className="px-5 py-1 grid place-items-center">
          <TextField
            className="w-full"
            centerText
            label={t("message.specifyPokemon")}
            name="defenderList"
          />
        </div>
        <div className="grid grid-cols-2 place-items-center">
          <SelectorUI
            options={boost}
            selectorAbove
            label={t("message.defStatBoost")}
            name={"boostDef"}
            width={"XS"}
            height={"S"}
          />
          <SelectorUI
            options={boost}
            selectorAbove
            label={t("message.spdStatBoost")}
            name={"boostSpd"}
            width={"XS"}
            height={"S"}
          />
        </div>

        <div className="mt-5 grid place-items-center">
          <RadioGroupUI options={target} name="target" />
        </div>
      </div>
    </>
  );
};
