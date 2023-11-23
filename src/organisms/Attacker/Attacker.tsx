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
import { useEffect, useState } from "react";
import { capitalizeEveryWord } from "../../utils/capitalize";
import {
  getAbilityList,
  getCompleteDexNames,
  getItemList,
  getMoveDetails,
  getMoveList,
} from "../../utils/pokemonConsts/lists";
import { SelectorArray } from "../../atom/SelectorArray/SelectorArray";
import { numberOfHits } from "../../utils/numberOfHits";
import { Button } from "../../atom/Button/Button";
import { ReportProps } from "../../types/reportProps";
import { usePokeapiData } from "../../hooks/usePokeapiData";
import { getAvatarUrl } from "../../utils/getAvatarUrl";
import { MoveData } from "@smogon/calc/dist/data/moves";

interface AttackerProps {
  avatar?: string;
  setAvatar: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const Attacker = ({ avatar, setAvatar }: AttackerProps) => {
  const { t } = useTranslation();
  const { watch, setValue, reset } = useFormContext();
  const [moveDetails, setMoveDetails] = useState<
    | (MoveData & {
        name: string;
      })
    | undefined
  >();
  const specie: string = watch("name");
  const move: string = watch("move");
  const { data, isLoading } = usePokeapiData(specie);
  const atk = data?.stats?.[1].base_stat.toString() ?? "90";
  const spa = data?.stats?.[3].base_stat.toString() ?? "90";

  const dexList = getCompleteDexNames();
  const itemList = getItemList();
  const abilityList = getAbilityList();
  const moveList = getMoveList();

  useEffect(() => {
    if (move !== "") {
      const oneMove = getMoveDetails(move);
      setMoveDetails(oneMove);
      setValue(
        "hits",
        oneMove?.multihit ? String(numberOfHits(oneMove.multihit)[0]) : ""
      );
      setValue("category", oneMove?.category);
    }
  }, [move]);

  useEffect(() => {
    if (specie !== "") {
      if (!isLoading && data) {
        const avatarUrl = getAvatarUrl(data?.name, data);
        setAvatar(avatarUrl);
        setValue(
          "ability",
          capitalizeEveryWord(
            data.abilities?.[0].ability?.name.replaceAll("-", " ") ?? ""
          )
        );
        setValue("avatar", avatarUrl);
      } else {
        setAvatar(undefined);
      }
    }
  }, [isLoading, specie]);

  const handleRestore = () => {
    const storedData = localStorage.getItem("pokemonSetData");
    if (storedData) {
      const parsedData: ReportProps = JSON.parse(storedData);
      reset(parsedData);
    }
  };

  return (
    <div>
      <div className="flex flex-col min-[315px]:px-4 sm:px-12 py-4 gap-y-4">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 justify-center gap-x-6 gap-y-8 w-full">
          <Avatar url={avatar} className="flex flex-row justify-center" />
          <div className=" grid place-items-center sm:grid-rows-2 min-[315px]:grid-cols-1 gap-y-2 ">
            {localStorage.getItem("pokemonSetData") && (
              <Button
                className="rounded-lg w-full"
                onClick={() => handleRestore()}
                label="Restore last set"
              ></Button>
            )}
            <ComboBoxUI
              options={dexList}
              name="name"
              label={t("attacker.selectPokemon")}
            />
          </div>
        </div>
        <div className="grid place-items-center sm:grid-cols-2 gap-y-2 gap-x-8 ">
          <ComboBoxUI
            options={abilityList}
            name="ability"
            className="w-full"
            label={t("attacker.selectAbility")}
          />
          <ComboBoxUI
            options={itemList}
            name="item"
            className="w-full"
            label={t("attacker.selectItem")}
          />
          <SelectorUI
            className="w-full"
            name="nature"
            options={nature}
            label={t("attacker.nature")}
          />
        </div>
        <div className="grid w-full  sm:grid-cols-12 gap-2">
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
        <RadioGroupUI
          label={t("attacker.selectMechanic") ?? ""}
          className="w-full"
          name="mechanic"
          options={mechanic}
        />
        {watch("mechanic") === "tera" && (
          <SelectorUI
            options={teraType}
            name="teraType"
            label={t("attacker.selectTeraType")}
          />
        )}

        <div className="py-4 gap-x-2">
          <Stats atk={atk} spa={spa} />
        </div>
      </div>
    </div>
  );
};
