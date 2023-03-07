import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "../../atom/Text/Text";
import { Carousel } from "../../molecules/Carousel/Carousel";
import { ReportProps } from "../../types/reportProps";

interface LoadingCalcsProps {
  //data: ReportProps | undefined;
  //Recordatorio cambiar el any
}

export const LoadingCalcs = ({}: LoadingCalcsProps) => {
  const { t } = useTranslation();
  const [text, setText] = React.useState<string>("Paso 1");

  //todo: obtener lista de pokes, crear un array vacio, e ir añadiendo los pokes que se van calculando de 1 en 1

  return (
    <div className="flex flex-col gap-y-3">
      <Text className="p-5 text-xl font-semibold">
        We are doing the calcs, it will take until 20 minutes long. Meanwhile,
        you can do other stuff or watch some content here and be relaxed :D
      </Text>
      <Carousel />
      <Text>{text}</Text>
    </div>
  );
};
