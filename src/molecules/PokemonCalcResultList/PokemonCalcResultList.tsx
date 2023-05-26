import { useEffect, useState } from "react";
import { Sprite } from "../../atom/Sprite/Sprite";
import { TextFieldCommon } from "../../atom/TextFieldCommon/TextFieldCommon";
import { CalcList } from "../../types/calcList";
import { survivalColor } from "../../utils/color";
import { Text } from "../../atom/Text/Text";
import { SelectorNoLogic } from "../../atom/SelectorNoLogic/SelectorNoLogic";
import { OptionsType } from "../../type/options";
import { useTranslation } from "react-i18next";

type PokemonCalcResultProps = {
  resultsCalcs: CalcList[];
  setPokemonInfo: React.Dispatch<React.SetStateAction<CalcList | undefined>>;
};

type SurvivalOptions = "all" | "yes" | "barely" | "no";

export const PokemonCalcResultList = ({
  resultsCalcs,
  setPokemonInfo,
}: PokemonCalcResultProps) => {
  const [filteredList, setFilteredList] = useState<CalcList[]>([
    ...resultsCalcs,
  ]);
  const { t } = useTranslation();
  const [textInput, setTextInput] = useState<string>("");
  const [selector, setSelector] = useState<SurvivalOptions>("all");

  const survivalOptions: OptionsType[] = [
    { name: "common.all", value: "all" },
    { name: "common.survive", value: "yes" },
    { name: "common.barely", value: "barely" },
    { name: "common.cannot", value: "no" },
  ];

  useEffect(() => {
    if (selector === "all") {
      setFilteredList(resultsCalcs);
      return;
    }
    filterBySurvival(selector as "yes" | "barely" | "no");
  }, [selector]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filtered = resultsCalcs.filter((item) => {
      return item.pokemon.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredList(filtered);
  };

  const filterBySurvival = (canSurvive: "yes" | "barely" | "no") => {
    const filtered = resultsCalcs.filter((item) => {
      return item.canSurvive.includes(canSurvive);
    });
    setFilteredList(filtered);
  };

  return (
    <>
      <div className="flex justify-center mb-3">
        <div className="grid grid-cols-2 px-6 gap-x-12 gap-y-1">
          <Text className="text-3xl col-span-2 mb-1">
            Total: {filteredList.length}
          </Text>
          <TextFieldCommon
            label={t("common.searchPokemon")}
            placeholder="Write the Pokémon name"
            width="L"
            onChange={handleFilter}
          />
          <div>
            <SelectorNoLogic
              label={t("common.filterBy")}
              value={selector}
              options={survivalOptions}
              onChange={(e: SurvivalOptions) => {
                setSelector(e);
              }}
            ></SelectorNoLogic>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-y-6 max-h-80 overflow-auto place-items-center px-6">
        {filteredList.map((item, index) => {
          return (
            <Sprite
              key={index}
              src={item?.img}
              pokemonName={item?.pokemon}
              className={`${survivalColor(
                item?.calcExtreme?.ko_chance
              )} w-[72px] cursor-pointer`}
              onClick={() => setPokemonInfo(item)}
            />
          );
        })}
      </div>
    </>
  );
};
