import { Text } from "../../atom/Text/Text";
import { useTranslation } from "react-i18next";
import { FieldStats } from "../FieldStat/FieldStat";

interface StatsProps {
  atk: string;
  spa: string;
}

export const Stats = ({ atk, spa }: StatsProps) => {
  const { t } = useTranslation();

  const Layer = () => {
    return (
      <div className="grid grid-cols-6 gap-x-2">
        <div></div>
        <Text>Base</Text>
        <Text>IV</Text>
        <Text>EV</Text>
        <div></div>
        <div></div>
      </div>
    );
  };

  return (
    <>
      <div className="w-[80%] grid grid-rows-1 gap-y-1">
        <Layer />
      </div>
      <div className="w-[80%] grid grid-rows-2 gap-y-1">
        <FieldStats
          boostName="boostAtk"
          base={atk}
          categoryName={t("stats.atk")}
          evName="evAtk"
          ivName="ivAtk"
          isPhysical
        />
        <FieldStats
          boostName="boostSpa"
          base={spa}
          categoryName={t("stats.spa")}
          evName="evSpa"
          ivName="ivSpa"
        />
      </div>
    </>
  );
};
