import { Avatar } from "../../atom/Avatar/Avatar";
import { ComboBoxUI } from "../../atom/ComboBox/ComboBox";
import { SelectorUI } from "../../atom/Selector/Selector";
import { SwitchUI } from "../../atom/Switch/Switch";
import { Stats } from "../../molecules/Stats/Stats";
import { useTranslation } from "react-i18next";
import { nature, mechanic, category } from "../../utils/pokemonConsts";
import { RadioGroupUI } from "../../atom/RadioGroup/RadioGroup";
import { teraType } from "../../utils/pokemonConsts/teraType";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";

interface AttackerProps {
  dex: string[];
  itemList: string[];
  abilityList: string[];
  moveList: string[];
}

export const Attacker = ({
  dex,
  itemList,
  abilityList,
  moveList,
}: AttackerProps) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const [avatar, setAvatar] = useState<string>("");
  const specie: string = watch("name");

  useEffect(() => {
    if (specie !== "") {
      fetch(
        `https://pokeapi.co/api/v2/pokemon/${specie
          .replace(" ", "-")
          .toLowerCase()}`
      ).then((res) => {
        res
          .json()
          .then((data) => {
            setAvatar(() => {
              return data.sprites.front_default;
            });
          })
          .catch(() => {
            setAvatar(() => {
              return "https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png";
            });
          });
      });
    }
  }, [specie]);
  return (
    <>
      <div className="flex flex-col">
        <Avatar url={avatar} className="flex flex-row justify-center mt-5" />
        <div className=" mt-3 grid place-items-center sm:grid-cols-2 xs:grid-cols-1 gap-x-2">
          <ComboBoxUI
            options={dex}
            name="name"
            label={t("attacker.selectPokemon")}
          />
          <SelectorUI
            options={teraType}
            name="teraType"
            label={t("attacker.selectTeraType")}
          />
        </div>
        <div className="mt-3 grid place-items-center sm:grid-cols-2  xs:grid-cols-1 gap-x-2">
          <ComboBoxUI
            options={abilityList}
            name="ability"
            label={t("attacker.selectAbility")}
          />
          <ComboBoxUI
            options={itemList}
            name="item"
            label={t("attacker.selectItem")}
          />
        </div>
        <div className="mt-3 grid w-full place-items-center xs:grid-cols-1">
          <div className="flex flex-row gap-x-2">
            <ComboBoxUI
              options={moveList}
              name="move"
              width="L"
              label={t("attacker.selectMove")}
            />
            <SelectorUI
              options={category}
              width="XS"
              name="category"
              label={t("attacker.category")}
            />
            <SwitchUI label={t("button.crit")} className="mt-5 " name="crit" />
          </div>
        </div>
        <div className="mt-3 grid lg:grid-cols-2 md:grid-cols-1 place-items-center gap-x-2">
          <SelectorUI
            name="nature"
            options={nature}
            label={t("attacker.nature")}
            selectorAbove
          />
          <div>
            <RadioGroupUI
              className="mt-6 lg:mr-11 w-full"
              name="mechanic"
              options={mechanic}
            />
          </div>
        </div>
        <div className="mt-3 grid place-items-center  gap-x-2">
          <Stats />
        </div>
      </div>
    </>
  );
};
