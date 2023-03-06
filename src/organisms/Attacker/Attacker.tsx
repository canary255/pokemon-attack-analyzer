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
import { capitalizeEveryWord } from "../../utils/capitalize";
import { getMoveDetails } from "../../utils/pokemonConsts/lists";
import { SelectorArray } from "../../atom/SelectorArray/SelectorArray";
import { numberOfHits } from "../../utils/numberOfHits";

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
  const { watch, setValue } = useFormContext();
  const [avatar, setAvatar] = useState<string | undefined>();
  const [atk, setAtk] = useState<string>("90");
  const [spa, setSpa] = useState<string>("90");
  const [moveDetails, setMoveDetails] = useState<any>();
  const specie: string = watch("name");
  const move: string = watch("move");

  useEffect(() => {
    if (move !== "") {
      const oneMove = getMoveDetails(move);
      setMoveDetails(oneMove);
      setValue(
        "hits",
        oneMove?.multihit ? String(numberOfHits(oneMove.multihit)[0]) : ""
      );
    }
  }, [move]);

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
            setAvatar(
              data.name === "porygon-z"
                ? data.sprites.front_shiny
                : data.sprites.front_default
            );
            setAtk(data.stats[1].base_stat.toString());
            setSpa(data.stats[3].base_stat.toString());
            setValue(
              "ability",
              capitalizeEveryWord(
                data.abilities[0].ability.name.replaceAll("-", " ")
              )
            );
          })
          .catch(() => {
            setAvatar(undefined);
            setAtk("90");
            setSpa("90");
          });
      });
    }
  }, [specie]);

  return (
    <>
      <div className="flex flex-col">
        <Avatar
          url={avatar}
          teratype={watch("teraType")}
          className="flex flex-row justify-center mt-5"
        />
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
        <div className="mt-3 grid w-full place-items-center lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-8 xs:grid-cols-1">
          <div className="flex flex-row gap-x-2 lg:col-span-4 md:col-span-4 sm:col-span-6">
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
          </div>
          {moveDetails?.multihit && (
            <SelectorArray
              options={numberOfHits(moveDetails?.multihit)}
              width="XS"
              name="hits"
              label={t("attacker.numHits")}
            />
          )}
          <SwitchUI label={t("button.crit")} className="mt-5 " name="crit" />
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
        <div className="mt-3 grid place-items-center sm:mb-4 gap-x-2">
          <Stats atk={atk} spa={spa} />
        </div>
      </div>
    </>
  );
};
