import { useFormContext } from "react-hook-form";
import { Text } from "../../atom/Text/Text";
import { SelectorUI } from "../../atom/Selector/Selector";
import { TextField } from "../../atom/Textfield/TextField";
import { getStat } from "../../utils/getStat";
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

  return (
    <div className="grid grid-cols-6 gap-x-2 ">
      <Text className="py-1">{categoryName}</Text>
      <TextFieldCommon readOnly value={base} />
      <TextField name={ivName} maxLength={2} maxNumber={31} onlyNumber />
      <TextField name={evName} maxLength={3} maxNumber={252} onlyNumber />
      <TextFieldCommon
        readOnly
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
