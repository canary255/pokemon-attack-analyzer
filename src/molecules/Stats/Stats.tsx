import { SelectorUI } from "../../atom/Selector/Selector";
import { TextField } from "../../atom/Textfield/TextField";
import { heightSize, widthSize } from "../../utils/consts";

interface FieldStatsProps {
  categoryName: string;
  baseName: string;
  ivName: string;
  evName: string;
  stat: number;
  boostName: string;
}

const Layer = () => {
  return (
    <>
      <div></div>
      <p>Base</p>
      <p>IV</p>
      <p>EV</p>
      <div></div>
      <div></div>
    </>
  );
};

const FieldStats = ({
  categoryName,
  baseName,
  ivName,
  evName,
  stat,
  boostName,
}: FieldStatsProps) => {
  const inputWidthSize = "XXS";
  const inputHeightSize = "XS";
  return (
    <>
      <p>{categoryName}</p>
      <TextField
        name={baseName}
        width={inputWidthSize}
        height={inputHeightSize}
      />
      <TextField
        name={ivName}
        width={inputWidthSize}
        height={inputHeightSize}
      />
      <TextField
        name={evName}
        width={inputWidthSize}
        height={inputHeightSize}
      />
      <p>{stat}</p>
      <SelectorUI
        side="up"
        name={boostName}
        width={inputWidthSize}
        height={inputHeightSize}
      />
    </>
  );
};

export const Stats = () => {
  return (
    <>
      <div className="w-[60%] grid grid-rows-3 gap-y-2 grid-cols-6">
        <Layer />
        <FieldStats
          baseName="baseAtk"
          boostName="boostAtk"
          categoryName="Atk"
          evName="evAtk"
          ivName="ivAtk"
          stat={679}
        />
        <FieldStats
          baseName="baseSpa"
          boostName="boostSpa"
          categoryName="SpA"
          evName="evSpa"
          ivName="ivSpa"
          stat={679}
        />
      </div>
    </>
  );
};
