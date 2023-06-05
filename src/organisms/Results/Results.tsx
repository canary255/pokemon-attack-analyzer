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

interface LoadingCalcsProps {
  resultsCalcs: CalcList[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: ReportProps | undefined;
  avatar: string;
}

const DOWNLOAD_BUTTON_CLASS =
  "text-[14px] border border-red-300 bg-red-600 text-white font-semibold rounded-full w-1/4 h-16 mx-auto flex justify-center items-center hover:bg-red-700";

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

  const resetPage = () => {
    setPage(0);
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
          />
        )}
      </div>
      <Divider className="mt-16" />

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
  );
};
