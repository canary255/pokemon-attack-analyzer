import { Label } from "../../atom/Label/Label";
import { SelectorUI } from "../../atom/Selector/Selector";
import { TextField } from "../../atom/Textfield/TextField";
import { useTranslation } from "react-i18next";
import { boost } from "../../utils/pokemonConsts/boost";

interface FieldStatsProps {
  categoryName: string | null;
  ivName: string;
  evName: string;
  stat: number;
  boostName: string;
}

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
  ivName,
  evName,
  stat,
  boostName,
}: FieldStatsProps) => {
  const textFieldWidthSize = "XXS";
  const selectorWidthSize = "XS";
  const inputHeightSize = "XS";
  return (
    <>
      <Label>{categoryName}</Label>
      <Label>170</Label>
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
      <p>{stat}</p>
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

export const Stats = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="w-[60%] grid grid-rows-3 gap-y-2 grid-cols-6">
        <Layer />
        <FieldStats
          boostName="boostAtk"
          categoryName={t("stats.atk")}
          evName="evAtk"
          ivName="ivAtk"
          stat={679}
        />
        <FieldStats
          boostName="boostSpa"
          categoryName={t("stats.spa")}
          evName="evSpa"
          ivName="ivSpa"
          stat={679}
        />
      </div>
    </>
  );
};
