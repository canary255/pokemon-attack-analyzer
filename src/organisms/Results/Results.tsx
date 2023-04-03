import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sprite } from "../../atom/Sprite/Sprite";
import { ColorKey } from "../../molecules/ColorKey/ColorKey";
import { PokemonCalcResult } from "../../molecules/PokemonCalcResult/PokemonCalcResult";
import { CalcList } from "../../types/calcList";

interface LoadingCalcsProps {
  resultsCalcs: CalcList[];
}

export const Results = ({ resultsCalcs }: LoadingCalcsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-y-5">
      <ColorKey />
      <PokemonCalcResult resultsCalcs={resultsCalcs} />
    </div>
  );
};
