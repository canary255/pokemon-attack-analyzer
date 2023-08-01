import { useState, useRef, useMemo, useLayoutEffect } from "react";
import { Sprite } from "../../atom/Sprite/Sprite";
import { TextFieldCommon } from "../../atom/TextFieldCommon/TextFieldCommon";
import { CalcList } from "../../types/calcList";
import { survivalColor } from "../../utils/color";
import { Text } from "../../atom/Text/Text";
import { SelectorNoLogic } from "../../atom/SelectorNoLogic/SelectorNoLogic";
import { OptionsType } from "../../types/options";
import { useTranslation } from "react-i18next";

type PokemonCalcResultProps = {
  resultsCalcs: CalcList[];
  pokemonInfo?: CalcList;
  setPokemonInfo: React.Dispatch<React.SetStateAction<CalcList | undefined>>;
  filteredList: CalcList[];
  setFilteredList: React.Dispatch<React.SetStateAction<CalcList[]>>;
  lastScrollPosition: number;
  setLastScrollPosition: React.Dispatch<React.SetStateAction<number>>;
};

type SurvivalOptions = "all" | "yes" | "barely" | "no";

export const PokemonCalcResultList = ({
  resultsCalcs,
  setPokemonInfo,
  filteredList,
  setFilteredList,
  pokemonInfo,
  lastScrollPosition,
  setLastScrollPosition,
}: PokemonCalcResultProps) => {
  const { t } = useTranslation();
  const [selector, setSelector] = useState<SurvivalOptions>("all");
  const [text, setText] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const scrollPosition = scrollContainerRef.current?.scrollTop ?? 0;
    setScrollPosition(scrollPosition);
  };

  const filterBySurvival = (canSurvive: "yes" | "barely" | "no") => {
    const filtered = resultsCalcs.filter((item) => {
      return item.canSurvive.includes(canSurvive);
    });
    setFilteredList(filtered);
  };

  useLayoutEffect(() => {
    if (!pokemonInfo) {
      scrollContainerRef.current?.scrollTo(0, lastScrollPosition);
    }
  }, [pokemonInfo]);

  const handlePokemonInfo = (item: CalcList) => {
    setLastScrollPosition(scrollPosition);
    setPokemonInfo(item);
  };

  const survivalOptions: OptionsType[] = [
    { name: "common.all", value: "all" },
    { name: "common.survive", value: "yes" },
    { name: "common.barely", value: "barely" },
    { name: "common.cannot", value: "no" },
  ];

  useMemo(() => {
    setText("");
    if (selector === "all") {
      setFilteredList(resultsCalcs);
      return;
    }
    filterBySurvival(selector as "yes" | "barely" | "no");
  }, [selector]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    const filtered = resultsCalcs.filter((item) => {
      if (selector === "all")
        return item.pokemon.toLowerCase().includes(value.toLowerCase());
      return (
        item.pokemon.toLowerCase().includes(value.toLowerCase()) &&
        item.canSurvive.includes(selector)
      );
    });

    setFilteredList(filtered);
  };

  return (
    <>
      <div className="flex justify-center mb-3">
        <div className="grid lg:grid-cols-2 grid-cols-1 px-6 gap-x-12 gap-y-1">
          <Text className="text-3xl lg:col-span-2 mb-1">
            Total: {filteredList.length}
          </Text>
          <TextFieldCommon
            label={t("common.searchPokemon")}
            placeholder="Write the Pokémon name"
            value={text}
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
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="grid min-[315px]:grid-cols-3 sm:grid-cols-5 gap-y-6 lg:max-h-80 min-[315px]:max-h-64 overflow-auto place-items-center px-6"
      >
        {filteredList.map((item) => {
          return (
            <Sprite
              key={item.pokemon}
              src={item?.img}
              pokemonName={item?.pokemon}
              className={`${survivalColor(
                item?.calcExtreme?.ko_chance
              )} w-[72px] cursor-pointer`}
              onClick={() => handlePokemonInfo(item)}
            />
          );
        })}
      </div>
    </>
  );
};
