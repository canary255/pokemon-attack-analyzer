import { Dex } from "@pkmn/dex";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { Button } from "../atom/Button/Button";
import { Attacker } from "../organisms/Attacker/Attacker";
import { Defender } from "../organisms/Defender/Defender";
import { Information } from "../organisms/Information/Information";
import { reportInitialState } from "../schema/schema";
import { ReportProps } from "../types/reportProps";
import { notAllowedForms } from "../utils/pokemonConsts/notAllowedForms";

export const Report = () => {
  const methods = useForm<ReportProps>({
    defaultValues: reportInitialState,
  });
  const [dataForm, setDataForm] = useState<ReportProps>();
  const onSubmit = (data: ReportProps) => setDataForm(data);

  const map = new Map(Object.entries(Dex.data.Species));
  const dexList: any = [];

  map.forEach((value) => {
    const form = value.name.split("-");
    const notAllowed = form[form.length - 1].toLowerCase();
    if (form.length > 1 && notAllowedForms.includes(notAllowed)) return;
    if (value.num > 0) dexList.push(value.name);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 xl:h-[91.5vh] bg-gray-100">
          <div className="border-r border-black">
            <Attacker />
          </div>
          <div className="border-r border-black">
            <Defender />
          </div>
          <div className="xl:col-span-1 md:col-span-2 flex flex-col">
            <>
              <Information />
              {dataForm ? JSON.stringify(dataForm, null, "\t") : null}
            </>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
