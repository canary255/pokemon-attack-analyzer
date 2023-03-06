import { useTranslation } from "react-i18next";
import { Button } from "../../atom/Button/Button";
import { Text } from "../../atom/Text/Text";
import { Carousel } from "../../molecules/Carousel/Carousel";

export const LoadingCalcs = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-y-3">
      <Text className="p-5 text-xl font-semibold">
        We are doing the calcs, it will take until 20 minutes long. Meanwhile,
        you can do other stuff and be relaxed :D
      </Text>
      <div className="w-full">
        <Carousel />
      </div>
      <Text>Poner el pokemon que va aqui</Text>
    </div>
  );
};
