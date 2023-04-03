import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sprite } from "../../atom/Sprite/Sprite";
import { ColorKey } from "../../molecules/ColorKey/ColorKey";
import { PokemonCalcResult } from "../../molecules/PokemonCalcResult/PokemonCalcResult";

interface LoadingCalcsProps {
  //data: ReportProps | undefined;
  //Recordatorio cambiar el any
  numberDex: number;
  totalDex: number;
  avatar: string;
}

export const Results = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-y-5">
      <ColorKey />
      <PokemonCalcResult />
    </div>
  );
};
