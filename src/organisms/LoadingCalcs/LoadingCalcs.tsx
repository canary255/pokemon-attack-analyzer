import React, { SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "../../atom/Text/Text";
import { Carousel } from "../../molecules/Carousel/Carousel";
import { LoadingBar } from "../../molecules/LoadingBar/LoadingBar";
import { Button } from "../../atom/Button/Button";
import { setCancelAction } from "../../utils/cancelAction";

interface LoadingCalcsProps {
  //data: ReportProps | undefined;
  //Recordatorio cambiar el any
  numberDex: number;
  totalDex: number;
  avatar: string;
}

export const LoadingCalcs = ({
  totalDex,
  numberDex,
  avatar,
}: LoadingCalcsProps) => {
  const { t } = useTranslation();
  const percentage = (numberDex / totalDex) * 100;

  //todo: obtener lista de pokes, crear un array vacio, e ir añadiendo los pokes que se van calculando de 1 en 1

  return (
    <div className="flex flex-col gap-y-1">
      <Text className="p-5 text-xl font-semibold">
        We are doing the calcs, it will take until 20 minutes long. Meanwhile,
        you can do other stuff or watch some content here and be relaxed :D
      </Text>
      {/*<Carousel />*/}
      <div className="flex flex-col items-center">
        <img
          className={`w-[20%] h-[20%] flex-none`}
          src={avatar}
          alt="Rounded avatar"
        />
        <LoadingBar width={isNaN(percentage) ? "0" : percentage.toFixed(2)} />
        <Button
          name="cancel"
          label="Cancel process"
          onClick={() => setCancelAction()}
        />
      </div>
    </div>
  );
};
