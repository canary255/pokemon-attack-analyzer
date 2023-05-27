import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { Attacker } from "../organisms/Attacker/Attacker";
import { Defender } from "../organisms/Defender/Defender";
import { Information } from "../organisms/Information/Information";
import { LoadingCalcs } from "../organisms/LoadingCalcs/LoadingCalcs";
import { reportInitialState, testingSet } from "../schema/schema";
import { ReportProps } from "../types/reportProps";
import { loadDataCalculator } from "../utils/calculateDamage";
import missingno from "../assets/const/Missingno.png";
import {
  getAbilityList,
  getCompleteDexNames,
  getItemList,
  getMoveList,
} from "../utils/pokemonConsts/lists";
import { CalcList } from "../types/calcList";
import { Results } from "../organisms/Results/Results";

export const Report = () => {
  const methods = useForm<ReportProps>({
    defaultValues: testingSet,
  });
  const [page, setPage] = useState<number>(0);
  const [resultsCalcs, setResultCalcs] = useState<CalcList[]>([]);
  const [numberDex, setNumberDex] = useState<number>(0);
  const [totalDex, setTotalDex] = useState<number>(0);
  const [avatar, setAvatar] = useState<string>(missingno);
  const [data, setData] = useState<ReportProps>();
  const [isCancel, setIsCancel] = useState<boolean>(false);
  const onSubmit = (data: ReportProps) => {
    setPage((prev) => {
      return prev + 1;
    });
    loadDataCalculator(
      data,
      setNumberDex,
      setTotalDex,
      setPage,
      setResultCalcs
    );
    setData(data);
  };

  const dexList = getCompleteDexNames();
  const itemList = getItemList();
  const abilityList = getAbilityList();
  const moveList = getMoveList();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 xl:h-[91.5vh] bg-gray-100 dark:bg-darkGray">
          <div className="border lg:border-b-0 sm:border-b border-black dark:border-white">
            <Attacker
              dex={dexList}
              itemList={itemList}
              abilityList={abilityList}
              moveList={moveList}
              avatar={avatar}
              setAvatar={setAvatar}
            />
          </div>
          <div className="border lg:border-b-0 sm:border-b border-black dark:border-white">
            <Defender />
          </div>
          <div className="border border-black xl:col-span-1 md:col-span-2">
            {page === 0 && <Information />}
            {page === 1 && (
              <LoadingCalcs
                numberDex={numberDex}
                totalDex={totalDex}
                avatar={avatar}
              />
            )}
            {page === 2 && (
              <Results
                resultsCalcs={resultsCalcs}
                setPage={setPage}
                data={data}
                avatar={avatar}
              />
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
