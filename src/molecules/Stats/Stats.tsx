import { Label } from "../../atom/Label/Label";
import { useTranslation } from "react-i18next";
import { FieldStats } from "../FieldStat/FieldStat";

export const Stats = () => {
  const { t } = useTranslation();

  const Layer = () => {
    return (
      <>
        <div></div>
        <Label>Base</Label>
        <Label>IV</Label>
        <Label>EV</Label>
        <div></div>
        <div></div>
      </>
    );
  };

  return (
    <>
      <div className="w-[60%] grid grid-rows-3 gap-y-2 grid-cols-6">
        <Layer />
        <FieldStats
          boostName="boostAtk"
          categoryName={t("stats.atk")}
          evName="evAtk"
          ivName="ivAtk"
          isPhysical
        />
        <FieldStats
          boostName="boostSpa"
          categoryName={t("stats.spa")}
          evName="evSpa"
          ivName="ivSpa"
        />
      </div>
    </>
  );
};
