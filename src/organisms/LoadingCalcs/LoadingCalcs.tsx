import { useTranslation } from "react-i18next";
import { Text } from "../../atom/Text/Text";
import { Carousel } from "../../molecules/Carousel/Carousel";
import { LoadingBar } from "../../molecules/LoadingBar/LoadingBar";
import { Button } from "../../atom/Button/Button";
import { setCancelAction } from "../../utils/cancelAction";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface LoadingCalcsProps {
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

  return (
    <div className="flex flex-col gap-y-1">
      <Text className="p-5 text-xl font-semibold">
        {t("projectExplain.calcProcess")}
      </Text>
      {/*<Carousel />*/}
      <div className="flex flex-col items-center gap-y-16">
        <CircularProgressbarWithChildren value={percentage}>
          <img src={avatar} alt="Rounded avatar" />
          <div className="text-xl">
            <strong>{percentage.toFixed(2)}%</strong>
          </div>
        </CircularProgressbarWithChildren>
        <Button
          name="cancel"
          label={t("message.cancelProcess")}
          circleBorder="all"
          className="w-80 h-36 text-4xl font-semibold border border-red-300 bg-red-600"
          onClick={() => setCancelAction()}
        />
      </div>
    </div>
  );
};
