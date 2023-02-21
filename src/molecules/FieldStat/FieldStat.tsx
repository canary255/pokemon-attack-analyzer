import { useFormContext } from "react-hook-form";
import { Label } from "../../atom/Label/Label";
import { SelectorUI } from "../../atom/Selector/Selector";
import { TextField } from "../../atom/Textfield/TextField";
import { getStat } from "../../utils/getStat";
import { boost } from "../../utils/pokemonConsts";

interface FieldStatsProps {
  categoryName: string | null;
  base?: string;
  ivName: string;
  evName: string;
  boostName: string;
  isPhysical?: boolean;
}

export const FieldStats = ({
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
  const { watch, setValue } = useFormContext();
  const values = watch();
  const iv = values[ivName];
  const ev = values[evName];
  const boostStat = values[boostName];
  const nature = values["nature"];

  if (ev > 252) setValue(evName, "252");
  if (ev < 0) setValue(evName, "0");
  if (iv > 31) setValue(ivName, "31");
  if (iv < 0) setValue(ivName, "0");

  return (
    <>
      <Label className="text-base">{categoryName}</Label>
      <Label className="text-base">{base}</Label>
      <TextField
        className="mt-[-4px]"
        name={ivName}
        width={textFieldWidthSize}
        height={inputHeightSize}
        onlyNumber
      />
      <TextField
        className="mt-[-4px]"
        name={evName}
        width={textFieldWidthSize}
        height={inputHeightSize}
        onlyNumber
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
