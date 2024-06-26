import { useState, useRef, useLayoutEffect, useMemo } from "react";
import { Sprite } from "../../atom/Sprite/Sprite";
import { TextFieldCommon } from "../../atom/TextFieldCommon/TextFieldCommon";
import { CalcList } from "../../types/calcList";
import { survivalColor } from "../../utils/color";
import { Text } from "../../atom/Text/Text";
import { SelectorNoLogic } from "../../atom/SelectorNoLogic/SelectorNoLogic";
import { useTranslation } from "react-i18next";
import { setOptions, survivalOptions } from "../../utils/consts";
import { canSurvive } from "./utils/helpers";
import { useResultsStore } from "../../hooks/useResultsStore";
import { SetOptions, SurvivalOptions } from "./interfaces/options";
import { useFilterStore } from "../../hooks/useFilterStore";

type PokemonCalcResultProps = {
  resultsCalcs: CalcList[];
  filteredList: CalcList[];
  setFilteredList: React.Dispatch<React.SetStateAction<CalcList[]>>;
};

export const PokemonCalcResultList = ({
  resultsCalcs,
  filteredList,
  setFilteredList,
}: PokemonCalcResultProps) => {
  const { t } = useTranslation();
  const {
    selector,
    setSelector,
    pokemonSet,
    setPokemonSet,
    pokemonName,
    setPokemonName,
  } = useFilterStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const {
    pokemonInfo,
    setPokemonInfo,
    lastScrollPosition,
    setLastScrollPosition,
  } = useResultsStore();

  const handleScroll = () => {
    const scrollPosition = scrollContainerRef.current?.scrollTop ?? 0;
    setScrollPosition(scrollPosition);
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

  useMemo(() => {
    const filtered = resultsCalcs.filter((item) => {
      const canPokemonSurvive = canSurvive(
        pokemonSet === "common" ? item.calcSet : item.calcExtreme
      );
      if (selector === "all")
        return item.pokemon.toLowerCase().includes(pokemonName.toLowerCase());
      return (
        item.pokemon.toLowerCase().includes(pokemonName.toLowerCase()) &&
        canPokemonSurvive === selector
      );
    });

    setFilteredList(filtered);
  }, [pokemonName, selector, pokemonSet]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPokemonName(value);
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
        <div className="grid grid-cols-3 px-6 sm:gap-x-8 gap-y-1 mb-2">
          <Text className="text-3xl col-span-3 mb-1">
            Total: {filteredList.length}
          </Text>
          <div className="col-span-3 sm:col-span-1">
            <TextFieldCommon
              label={t("common.searchPokemon")}
              placeholder="Write the Pokémon name"
              value={pokemonName}
              onChange={handleFilter}
            />
          </div>
          <div className="col-span-2 w-3/4 sm:w-full sm:col-span-1">
            <SelectorNoLogic
              label={t("common.filterBy")}
              value={selector}
              options={survivalOptions}
              onChange={handleSurvival}
            />
          </div>
          <div className="w-3/4 sm:w-full">
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
        className="shadow-custom-medium grid min-[315px]:grid-cols-3 bg-gray-100 dark:bg-gray-600 rounded-lg py-2 sm:grid-cols-5 gap-y-6 max-h-96  overflow-auto place-items-center px-6"
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
