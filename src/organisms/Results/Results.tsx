import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sprite } from "../../atom/Sprite/Sprite";
import { ColorKey } from "../../molecules/ColorKey/ColorKey";
import { PokemonCalcResultList } from "../../molecules/PokemonCalcResultList/PokemonCalcResultList";
import { CalcList } from "../../types/calcList";
import { CalcData } from "../../types/calcData";
import { PokemonCalcInfo } from "../../molecules/PokemonCalcInfo/PokemonCalcInfo";
import { Divider } from "../../atom/Divider/Divider";

interface LoadingCalcsProps {
  resultsCalcs: CalcList[];
}

export const Results = ({ resultsCalcs }: LoadingCalcsProps) => {
  const { t } = useTranslation();
  const [pokemonInfo, setPokemonInfo] = useState<CalcList | undefined>();

  return (
    <div className="flex flex-col gap-y-5">
      <ColorKey />
      <Divider className="my-0" />
      {pokemonInfo ? (
        <PokemonCalcInfo
          pokemonInfo={pokemonInfo}
          setPokemonInfo={setPokemonInfo}
        />
      ) : (
        <PokemonCalcResultList
          resultsCalcs={resultsCalcs}
          setPokemonInfo={setPokemonInfo}
        />
      )}
      <Divider />
    </div>
  );
};
