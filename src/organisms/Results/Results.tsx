import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ColorKey } from "../../molecules/ColorKey/ColorKey";
import { PokemonCalcResultList } from "../../molecules/PokemonCalcResultList/PokemonCalcResultList";
import { CalcList } from "../../types/calcList";
import { PokemonCalcInfo } from "../../molecules/PokemonCalcInfo/PokemonCalcInfo";
import { Divider } from "../../atom/Divider/Divider";
import { Button } from "../../atom/Button/Button";
import { ReportProps } from "../../types/reportProps";
import { renderToString } from "react-dom/server";
import { ReportPDF } from "../../molecules/ReportPDF/ReportPDF";
import { Text } from "../../atom/Text/Text";
import jsPDF from "jspdf";
import { useResultsStore } from "../../hooks/useResultsStore";

interface LoadingCalcsProps {
  resultsCalcs: CalcList[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: ReportProps | undefined;
  avatar?: string;
}

const DOWNLOAD_BUTTON_CLASS =
  "text-[0.875rem] border border-red-300 bg-red-600 text-white font-semibold rounded-full w-1/4 h-16 mx-auto flex justify-center items-center hover:bg-red-700";

export const Results = ({
  resultsCalcs,
  setPage,
  data,
  avatar,
}: LoadingCalcsProps) => {
  const { t } = useTranslation();
  const [filteredList, setFilteredList] = useState<CalcList[]>([
    ...resultsCalcs,
  ]);
  const { pokemonInfo, setPokemonInfo } = useResultsStore();

  const resetPage = () => {
    setPage(0);
    setPokemonInfo(undefined);
  };

  const print = () => {
    const string = renderToString(
      <ReportPDF avatar={avatar} data={data} resultsCalcs={filteredList} />
    );
    const pdf = new jsPDF({ format: "a4" });
    pdf.html(string, {
      callback: function (doc) {
        doc.save(`${data?.name} - ${data?.move}`);
      },
      x: 15,
      y: 15,
      width: 170, //target width in the PDF document
      windowWidth: 650, //window width in CSS pixels
    });
  };

  return (
    <>
      <div className="h-1/8">
        <ColorKey />
      </div>
      <Divider className="my-0" />
      <div className="py-2">
        {pokemonInfo ? (
          <PokemonCalcInfo />
        ) : (
          <PokemonCalcResultList
            resultsCalcs={resultsCalcs}
            filteredList={filteredList}
            setFilteredList={setFilteredList}
          />
        )}
      </div>
      <Divider />

      <div className="flex flex-col h-full justify-between py-4">
        <Text className="px-2 font-semibold">{t("projectExplain.note2")}</Text>
        <div className="flex flex-row gap-x-4">
          <Button
            name=""
            onClick={() => {
              print();
            }}
            label={t("common.generatePdf")}
            className={DOWNLOAD_BUTTON_CLASS}
          ></Button>

          <Button
            circleBorder="all"
            className="w-1/2 h-16 mx-auto"
            name=""
            label={t("message.generateAnother")}
            onClick={() => {
              resetPage();
            }}
          />
        </div>
      </div>
    </>
  );
};
