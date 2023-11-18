import { useFormContext } from "react-hook-form";
import { Text } from "../../atom/Text/Text";
import { SelectorUI } from "../../atom/Selector/Selector";
import { TextField } from "../../atom/Textfield/TextField";
import {
  getPhysicalNatureMultiplier,
  getSpecialNatureMultiplier,
  getStat,
} from "../../utils/getStat";
import { boost } from "../../utils/pokemonConsts";
import { TextFieldCommon } from "../../atom/TextFieldCommon/TextFieldCommon";

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
  const { watch } = useFormContext();
  const values = watch();
  const iv = values[ivName];
  const ev = values[evName];
  const boostStat = values[boostName];
  const nature = values["nature"];

  const getColorNatureStat = () => {
    const natureBoost = isPhysical
      ? getPhysicalNatureMultiplier(nature)
      : getSpecialNatureMultiplier(nature);

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
        value={getStat(base, ev, iv, boostStat, nature, isPhysical)}
      />
      <SelectorUI
        className="w-fit"
        options={boost}
        selectorAbove
        name={boostName}
      />
    </div>
  );
};
