import React, { useEffect, useState } from "react";
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

const DOWNLOAD_BUTTON_CLASS =
  "border border-red-300 bg-red-600 text-white font-semibold rounded-full w-1/2 h-24 mx-auto flex justify-center items-center hover:bg-red-700";

export const Results = ({
  resultsCalcs,
  setPage,
  data,
  avatar,
}: LoadingCalcsProps) => {
  const { t } = useTranslation();
  const [pokemonInfo, setPokemonInfo] = useState<CalcList | undefined>();
  const [filteredList, setFilteredList] = useState<CalcList[]>([
    ...resultsCalcs,
  ]);
  const [generatePDF, setGeneratePDF] = useState<boolean>(false);

  const resetPage = () => {
    setPage(0);
    setGeneratePDF(() => {
      return false;
    });
  };

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
            filteredList={filteredList}
            setFilteredList={setFilteredList}
            setPokemonInfo={setPokemonInfo}
            setGeneratePDF={setGeneratePDF}
          />
        )}
      </div>
      <Divider className="mt-16" />

      <div className="flex flex-row gap-x-4">
        {generatePDF ? (
          <PDFDownloadLink
            className={DOWNLOAD_BUTTON_CLASS}
            document={
              <ReportPDF
                avatar={avatar}
                data={data}
                resultsCalcs={filteredList}
              />
            }
            fileName={`${data?.name} - ${data?.move}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading document..."
              ) : (
                <div className="flex flex-col items-center">
                  {t("common.downloadReport")}
                  <span className="material-symbols-outlined">download</span>
                </div>
              )
            }
          </PDFDownloadLink>
        ) : (
          <Button
            name=""
            onClick={() => {
              setGeneratePDF(true);
            }}
            label={t("common.generatePdf")}
            className={DOWNLOAD_BUTTON_CLASS}
          ></Button>
        )}
        <Button
          circleBorder="all"
          className="w-1/2 h-24 mx-auto"
          name=""
          label="Generate another report"
          onClick={() => {
            resetPage();
          }}
        />
      </div>
    </div>
  );
};
