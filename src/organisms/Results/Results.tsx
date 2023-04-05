import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ColorKey } from "../../molecules/ColorKey/ColorKey";
import { PokemonCalcResultList } from "../../molecules/PokemonCalcResultList/PokemonCalcResultList";
import { CalcList } from "../../types/calcList";
import { PokemonCalcInfo } from "../../molecules/PokemonCalcInfo/PokemonCalcInfo";
import { Divider } from "../../atom/Divider/Divider";
import { Button } from "../../atom/Button/Button";

interface LoadingCalcsProps {
  resultsCalcs: CalcList[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Results = ({ resultsCalcs, setPage }: LoadingCalcsProps) => {
  const { t } = useTranslation();
  const [pokemonInfo, setPokemonInfo] = useState<CalcList | undefined>();

  return (
    <div className="flex flex-col gap-y-5">
      <ColorKey />
      <Divider className="my-0" />
      <div className="h-80">
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
      </div>
      <Divider />
      <Button
        circleBorder="all"
        className="w-1/2 h-24 mx-auto"
        name="backMainPage"
        label="Generate another report"
        onClick={() => setPage(0)}
      />
    </div>
  );
};
