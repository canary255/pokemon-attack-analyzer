import { Text } from "../../atom/Text/Text";
import { useTranslation } from "react-i18next";
import { FieldStats } from "../FieldStat/FieldStat";
import { useFormContext } from "react-hook-form";
import { ReportProps } from "../../types/reportProps";
import { speedDependantMoves } from "../../utils/speedDependantMoves";

interface StatsProps {
  atk: string;
  def: string;
  spa: string;
  spe: string;
}

export const Stats = ({ atk, def, spa, spe }: StatsProps) => {
  const { t } = useTranslation();
  const { watch } = useFormContext<ReportProps>();
  const move = watch("move");

  const Layer = () => {
    return (
      <div className="grid grid-cols-6 gap-x-2">
        <Text className="col-start-2">Base</Text>
        <Text>IV</Text>
        <Text>EV</Text>
      </div>
    );
  };

  return (
    <>
      <div className="w-full grid grid-rows-1 gap-y-1">
        <Layer />
      </div>
      <div className="grid grid-rows-2 gap-y-2">
        <FieldStats
          boostName="boostAtk"
          base={atk}
          categoryName={t("stats.atk")}
          evName="evAtk"
          ivName="ivAtk"
        />

        <FieldStats
          boostName="boostSpa"
          base={spa}
          categoryName={t("stats.spa")}
          evName="evSpa"
          ivName="ivSpa"
        />
        {move === "Body Press" && (
          <FieldStats
            boostName="boostUserDef"
            base={def}
            categoryName={t("stats.def")}
            evName="evUserDef"
            ivName="ivUserDef"
          />
        )}
        {speedDependantMoves.includes(move) && (
          <FieldStats
            boostName="boostSpe"
            base={spe}
            categoryName={t("stats.spe")}
            evName="evSpe"
            ivName="ivSpe"
          />
        )}
      </div>
    </>
  );
};
