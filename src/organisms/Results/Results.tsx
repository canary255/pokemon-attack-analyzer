import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ColorKey } from "../../molecules/ColorKey/ColorKey";
import { PokemonCalcResultList } from "../../molecules/PokemonCalcResultList/PokemonCalcResultList";
import { CalcList } from "../../types/calcList";
import { PokemonCalcInfo } from "../../molecules/PokemonCalcInfo/PokemonCalcInfo";
import { Divider } from "../../atom/Divider/Divider";
import { Button } from "../../atom/Button/Button";
import { ReportProps } from "../../types/reportProps";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "../../molecules/ReportPDF/ReportPDF";

interface LoadingCalcsProps {
  resultsCalcs: CalcList[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: ReportProps | undefined;
  avatar: string;
}

export const Results = ({
  resultsCalcs,
  setPage,
  data,
  avatar,
}: LoadingCalcsProps) => {
  const { t } = useTranslation();
  const [pokemonInfo, setPokemonInfo] = useState<CalcList | undefined>();

  return (
    <div className="flex flex-col gap-y-2">
      <ColorKey />
      <Divider className="my-0" />
      <div className="h-96">
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
      <Divider className="mt-16" />

      <div className="flex flex-row gap-x-4">
        {
          <PDFDownloadLink
            className="border border-red-300 bg-red-600 text-white font-semibold rounded-full w-1/2 h-24 mx-auto flex justify-center items-center hover:bg-red-700"
            document={
              <ReportPDF
                avatar={avatar}
                data={data}
                resultsCalcs={resultsCalcs}
              />
            }
            fileName={`${data?.name} - ${data?.move}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading document..."
              ) : (
                <div className="flex flex-col items-center">
                  Download Report as PDF
                  <span className="material-symbols-outlined">download</span>
                </div>
              )
            }
          </PDFDownloadLink>
        }
        <Button
          circleBorder="all"
          className="w-1/2 h-24 mx-auto"
          name="backMainPage"
          label="Generate another report"
          onClick={() => setPage(0)}
        />
      </div>
    </div>
  );
};
