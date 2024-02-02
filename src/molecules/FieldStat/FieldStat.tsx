import { useFormContext } from "react-hook-form";
import { Text } from "../../atom/Text/Text";
import { SelectorUI } from "../../atom/Selector/Selector";
import { TextField } from "../../atom/Textfield/TextField";
import { getStat } from "../../utils/getStat";
import { boost } from "../../utils/pokemonConsts";
import { TextFieldCommon } from "../../atom/TextFieldCommon/TextFieldCommon";
import { getNatureMultiplier } from "../../utils/getNatureMultiplier";

interface FieldStatsProps {
  categoryName: string | null;
  base?: string;
  ivName: string;
  evName: string;
  boostName: string;
}

export const FieldStats = ({
  categoryName,
  base = "170",
  ivName,
  evName,
  boostName,
}: FieldStatsProps) => {
  const { watch } = useFormContext();
  const values = watch();
  const iv = values[ivName];
  const ev = values[evName];
  const boostStat = values[boostName];
  const nature = values["nature"];
  const level = values["level"];

  const getColorNatureStat = () => {
    const natureBoost = getNatureMultiplier(evName, nature);

    if (natureBoost === 1.1) {
      return {
        class: "dark:text-red-400 text-red-500 font-bold",
        symbol: "⬆",
      };
    }
    if (natureBoost === 0.9) {
      return {
        class: "dark:text-blue-300 text-blue-400 font-bold",
        symbol: "⬇",
      };
    }
  };

  const statReference = getColorNatureStat();

  return (
    <div className="grid grid-cols-6 gap-x-2 ">
      <Text className="py-1">{categoryName}</Text>
      <TextFieldCommon readOnly value={base} />
      <TextField name={ivName} maxLength={2} maxNumber={31} onlyNumber />
      <TextField name={evName} maxLength={3} maxNumber={252} onlyNumber />
      <TextFieldCommon
        readOnly
        className={statReference?.class}
        value={getStat(base, ev, iv, boostStat, nature, evName, level)}
      />
      <SelectorUI
        className="w-fit max-sm:text-xs max-sm:w-6"
        options={boost}
        name={boostName}
      />
    </div>
  );
};
