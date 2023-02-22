import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { Button } from "../atom/Button/Button";
import { Attacker } from "../organisms/Attacker/Attacker";
import { Defender } from "../organisms/Defender/Defender";
import { reportInitialState } from "../schema/schema";
import { ReportProps } from "../types/reportProps";

export const Report = () => {
  const methods = useForm<ReportProps>({
    defaultValues: reportInitialState,
  });
  const [dataForm, setDataForm] = useState<ReportProps>();
  const onSubmit = (data: ReportProps) => setDataForm(data);

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
            <Button
              name="upload"
              type="submit"
              circleBorder="all"
              className="w-64 h-36"
              label="SUBMIT"
            />
            {dataForm ? JSON.stringify(dataForm, null, "\t") : null}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
