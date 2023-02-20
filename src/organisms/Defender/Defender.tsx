import { useTranslation } from "react-i18next";
import {
  selectPokemon,
  target,
  boost,
  weather,
  terrain,
} from "../../utils/pokemonConsts";
import { RadioGroupUI } from "../../atom/RadioGroup/RadioGroup";
import { TextField } from "../../atom/Textfield/TextField";
import { SelectorUI } from "../../atom/Selector/Selector";
import { Divider } from "../../atom/Divider/Divider";

export const Defender = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col">
        <div className="mt-5 grid place-items-center">
          <RadioGroupUI name="selectPokemon" options={selectPokemon} />
        </div>
        <div className="px-5 mt-3 grid place-items-center">
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
            label={t("message.defStatBoost")}
            name={"boostDef"}
            width={"XS"}
            height={"S"}
          />
          <SelectorUI
            options={boost}
            label={t("message.spdStatBoost")}
            name={"boostSpd"}
            width={"XS"}
            height={"S"}
          />
        </div>

        <div className="mt-5 grid place-items-center">
          <RadioGroupUI options={target} name="target" />
        </div>
        <Divider />
        <div className="mt-5 grid place-items-center">
          <RadioGroupUI options={terrain} name="terrain" />
        </div>
        <div className="mt-5 grid place-items-center">
          <RadioGroupUI
            className="grid grid-cols-5 w-[70%] items-center"
            options={weather}
            name="weather"
          />
        </div>
        <div className="mt-5 grid place-items-center"></div>
      </div>
    </>
  );
};
