import { useFormContext } from "react-hook-form";
import { Text } from "../../atom/Text/Text";
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

  return (
    <>
      <Text className="text-base">{categoryName}</Text>
      <Text className="text-base">{base}</Text>
      <TextField
        className="mt-[-4px]"
        name={ivName}
        width={textFieldWidthSize}
        height={inputHeightSize}
        maxLength={2}
        maxNumber={31}
        onlyNumber
      />
      <TextField
        className="mt-[-4px]"
        name={evName}
        width={textFieldWidthSize}
        height={inputHeightSize}
        maxLength={3}
        maxNumber={252}
        onlyNumber
      />
      <Text>{getStat(base, ev, iv, boostStat, nature, isPhysical)}</Text>
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
