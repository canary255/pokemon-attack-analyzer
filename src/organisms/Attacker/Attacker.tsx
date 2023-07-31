import { Avatar } from "../../atom/Avatar/Avatar";
import { ComboBoxUI } from "../../atom/ComboBox/ComboBox";
import { SelectorUI } from "../../atom/Selector/Selector";
import { SwitchUI } from "../../atom/Switch/Switch";
import { Stats } from "../../molecules/Stats/Stats";
import { useTranslation } from "react-i18next";
import { nature, mechanic, category } from "../../utils/pokemonConsts";
import { RadioGroupUI } from "../../atom/RadioGroup/RadioGroup";
import teraType from "../../utils/pokemonConsts/teraType";
import { useFormContext } from "react-hook-form";
import { useEffect, useState, useMemo } from "react";
import { capitalizeEveryWord } from "../../utils/capitalize";
import { getMoveDetails } from "../../utils/pokemonConsts/lists";
import { SelectorArray } from "../../atom/SelectorArray/SelectorArray";
import { numberOfHits } from "../../utils/numberOfHits";
import { Button } from "../../atom/Button/Button";
import { ReportProps } from "../../types/reportProps";

interface AttackerProps {
  dex: string[];
  itemList: string[];
  abilityList: string[];
  moveList: string[];
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
}

export const Attacker = ({
  dex,
  itemList,
  abilityList,
  moveList,
  avatar,
  setAvatar,
}: AttackerProps) => {
  const { t } = useTranslation();
  const { watch, setValue, reset } = useFormContext();
  const [atk, setAtk] = useState<string>("90");
  const [spa, setSpa] = useState<string>("90");
  const [moveDetails, setMoveDetails] = useState<any>();
  const specie: string = watch("name");
  const move: string = watch("move");

  useMemo(() => {
    if (move !== "") {
      const oneMove = getMoveDetails(move);
      setMoveDetails(oneMove);
      setValue(
        "hits",
        oneMove?.multihit ? String(numberOfHits(oneMove.multihit)[0]) : ""
      );
    }
  }, [move]);

  useMemo(() => {
    if (specie !== "") {
      fetch(
        `https://pokeapi.co/api/v2/pokemon/${specie
          .replace(" ", "-")
          .toLowerCase()}`
      ).then((res) => {
        res
          .json()
          .then((data) => {
            const avatarUrl =
              data.name === "porygon-z"
                ? data.sprites.front_shiny
                : data.sprites.front_default ?? "";
            setAvatar(avatarUrl);
            setAtk(data.stats[1].base_stat.toString());
            setSpa(data.stats[3].base_stat.toString());
            setValue(
              "ability",
              capitalizeEveryWord(
                data.abilities[0].ability.name.replaceAll("-", " ")
              )
            );
            setValue("avatar", avatarUrl);
          })
          .catch(() => {
            setAvatar("");
            setAtk("90");
            setSpa("90");
          });
      });
    }
  }, [specie]);

  const handleRestore = () => {
    const data = localStorage.getItem("pokemonSetData");
    if (data) {
      const parsedData: ReportProps = JSON.parse(data);
      reset(parsedData);
    }
  };

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 justify-center gap-x-16 gap-y-4">
          <Avatar
            url={avatar}
            teratype={watch("teraType")}
            className="flex flex-row justify-center mt-5"
          />
          <div className=" grid place-items-center sm:grid-rows-3 min-[315px]:grid-cols-1 gap-y-2 w-[90%]">
            {localStorage.getItem("pokemonSetData") && (
              <Button
                className="w-full"
                onClick={() => handleRestore()}
                label="Restore last set"
              ></Button>
            )}
            <ComboBoxUI
              options={dex}
              name="name"
              label={t("attacker.selectPokemon")}
            />
            <div className="w-full">
              <SelectorUI
                options={teraType}
                name="teraType"
                label={t("attacker.selectTeraType")}
              />
            </div>
          </div>
        </div>
        <div className="mt-3 grid place-items-center p-2 sm:grid-cols-2 gap-x-2">
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
        <div className="mt-6">
          <RadioGroupUI
            className="w-full justify-center"
            name="mechanic"
            options={mechanic}
          />
        </div>
        <div className="mt-3  place-items-center gap-x-2">
          <div className="xl:px-32 px-12 ">
            <SelectorUI
              className="col-span-5"
              name="nature"
              options={nature}
              label={t("attacker.nature")}
            />
          </div>
        </div>
        <div className="mt-3 grid w-full place-items-center sm:grid-cols-12 gap-x-6">
          <div className="col-span-6">
            <ComboBoxUI
              options={moveList}
              name="move"
              label={t("attacker.selectMove")}
            />
          </div>
          <div className="xl:col-span-2 sm:col-span-6 min-[315px]:col-span-2">
            <SelectorUI
              options={category}
              name="category"
              label={t("attacker.category")}
            />
          </div>
          {moveDetails?.multihit && (
            <div className="xl:col-span-2 sm:col-span-6 min-[315px]:col-span-2">
              <SelectorArray
                options={numberOfHits(moveDetails?.multihit)}
                name="hits"
                label={t("attacker.numHits")}
              />
            </div>
          )}
          <SwitchUI
            label={t("button.crit")}
            className="mt-5 xl:col-span-2 sm:col-span-6 min-[315px]:col-span-2"
            name="crit"
          />
        </div>
        <div className="mt-3 grid place-items-center sm:mb-4 gap-x-2">
          <Stats atk={atk} spa={spa} />
        </div>
      </div>
    </>
  );
};
