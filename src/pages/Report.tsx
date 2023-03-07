import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { Attacker } from "../organisms/Attacker/Attacker";
import { Defender } from "../organisms/Defender/Defender";
import { Information } from "../organisms/Information/Information";
import { LoadingCalcs } from "../organisms/LoadingCalcs/LoadingCalcs";
import { reportInitialState, testingSet } from "../schema/schema";
import { ReportProps } from "../types/reportProps";
import { calculateDamage } from "../utils/calculateDamage";
import {
  getAbilityList,
  getDexList,
  getItemList,
  getMoveList,
} from "../utils/pokemonConsts/lists";

export const Report = () => {
  const methods = useForm<ReportProps>({
    defaultValues: testingSet,
  });
  const [page, setPage] = useState<number>(0);
  const [resultCalcs, setResultCalcs] = useState([]);
  const [dataForm, setDataForm] = useState<ReportProps>();
  const onSubmit = (data: ReportProps) => {
    setDataForm(data);
    setPage(1);
    calculateDamage(data);
  };

  const dexList = getDexList();
  const itemList = getItemList();
  const abilityList = getAbilityList();
  const moveList = getMoveList();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 xl:h-[91.5vh] bg-gray-100 dark:bg-slate-600">
          <div className="border-r lg:border-b-0 sm:border-b border-black dark:border-white">
            <Attacker
              dex={dexList}
              itemList={itemList}
              abilityList={abilityList}
              moveList={moveList}
            />
          </div>
          <div className="border-r lg:border-b-0 sm:border-b border-black dark:border-white">
            <Defender />
          </div>
          <div className="xl:col-span-1 md:col-span-2">
            {page === 0 && <Information />}
            {page === 1 && <LoadingCalcs />}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
