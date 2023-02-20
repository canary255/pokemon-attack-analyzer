import { Label } from "../../atom/Label/Label";
import { SelectorUI } from "../../atom/Selector/Selector";
import { TextField } from "../../atom/Textfield/TextField";
import { useTranslation } from "react-i18next";
import { boost } from "../../utils/pokemonConsts/boost";
import { getStat } from "../../utils/getStat";
import { useFormContext } from "react-hook-form";

interface FieldStatsProps {
  categoryName: string | null;
  base?: string;
  ivName: string;
  evName: string;
  boostName: string;
  isPhysical?: boolean;
}

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

  const FieldStats = ({
    categoryName,
    base = "170",
    ivName,
    evName,
    boostName,
    isPhysical = false,
  }: FieldStatsProps) => {
    const textFieldWidthSize = "XXS";
    const selectorWidthSize = "XS";
    const inputHeightSize = "XS";
    const { watch } = useFormContext();
    const iv = watch(ivName);
    const ev = watch(evName);
    const boostStat = watch(boostName);
    const nature = watch("nature");
    console.log(boostStat, nature, iv, ev, base);

    return (
      <>
        <Label className="text-base">{categoryName}</Label>
        <Label className="text-base">{base}</Label>
        <TextField
          className="mt-[-4px]"
          name={ivName}
          width={textFieldWidthSize}
          height={inputHeightSize}
        />
        <TextField
          className="mt-[-4px]"
          name={evName}
          width={textFieldWidthSize}
          height={inputHeightSize}
        />
        <p>{getStat(base, ev, iv, boostStat, nature, isPhysical)}</p>
        <SelectorUI
          options={boost}
          selectorAbove
          className="mt-[-4px]"
          name={boostName}
          width={selectorWidthSize}
          height={inputHeightSize}
        />
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
