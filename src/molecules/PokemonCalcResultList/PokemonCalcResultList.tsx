import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Sprite } from "../../atom/Sprite/Sprite";
import { TextFieldCommon } from "../../atom/TextFieldCommon/TextFieldCommon";
import { CalcList } from "../../types/calcList";
import { survivalColor } from "../../utils/color";
import { Text } from "../../atom/Text/Text";
import { SelectorNoLogic } from "../../atom/SelectorNoLogic/SelectorNoLogic";
import { useTranslation } from "react-i18next";
import { CalcData, surviveEnum } from "../../types/calcData";
import { setOptions, survivalOptions } from "../../utils/consts";

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
type SetOptions = "common" | "extreme";

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
  const [pokemonSet, setPokemonSet] = useState<SetOptions>("extreme");
  const [text, setText] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const scrollPosition = scrollContainerRef.current?.scrollTop ?? 0;
    setScrollPosition(scrollPosition);
  };

  const canSurvive = (set?: CalcData) => {
    if (!set || !set.ko_chance || !set.ko_chance.chance) return surviveEnum.YES;
    if (set.ko_chance.chance === 1 && set.ko_chance.n === 1)
      return surviveEnum.NO;
    if (set.ko_chance.chance < 1 && set.ko_chance.n === 1)
      return surviveEnum.BARELY;
    return surviveEnum.YES;
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

  useEffect(() => {
    const filtered = resultsCalcs.filter((item) => {
      const canPokemonSurvive = canSurvive(
        pokemonSet === "common" ? item.calcSet : item.calcExtreme
      );
      if (selector === "all")
        return item.pokemon.toLowerCase().includes(text.toLowerCase());
      return (
        item.pokemon.toLowerCase().includes(text.toLowerCase()) &&
        canPokemonSurvive === selector
      );
    });

    setFilteredList(filtered);
  }, [text, selector, pokemonSet]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
  };

  const handleSurvival = (e: SurvivalOptions) => {
    setSelector(e);
  };

  const handleSet = (value: SetOptions) => {
    setPokemonSet(value);
  };

  return (
    <>
      <div className="flex justify-center w-full mb-3">
        <div className="grid lg:grid-cols-3 grid-cols-1 px-6 gap-x-8 gap-y-1">
          <Text className="text-3xl lg:col-span-3 mb-1">
            Total: {filteredList.length}
          </Text>
          <div>
            <TextFieldCommon
              label={t("common.searchPokemon")}
              placeholder="Write the Pokémon name"
              value={text}
              onChange={handleFilter}
            />
          </div>
          <div>
            <SelectorNoLogic
              label={t("common.filterBy")}
              value={selector}
              options={survivalOptions}
              onChange={handleSurvival}
            ></SelectorNoLogic>
          </div>
          <div>
            <SelectorNoLogic
              label={t("common.setFilter")}
              value={pokemonSet}
              options={setOptions}
              onChange={handleSet}
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
                item?.[pokemonSet === "extreme" ? "calcExtreme" : "calcSet"]
                  ?.ko_chance
              )} w-[72px] cursor-pointer`}
              onClick={() => handlePokemonInfo(item)}
            />
          );
        })}
      </div>
    </>
  );
};
