import { teratypeImage } from "../../utils/teratypeImage";
import missingno from "../../assets/const/Missingno.png";
import gigamax from "../../assets/const/Gigamax.png";
import zMove from "../../assets/const/zMove.png";
import { TypeName } from "@smogon/calc/dist/data/interface";
import { useFormContext } from "react-hook-form";
import { Mechanic } from "../../types/mechanic";

interface AvatarProps {
  className: string;
  url: string | undefined;
}

export const Avatar = ({ className, url }: AvatarProps) => {
  const { watch } = useFormContext();

  const teratype: Exclude<TypeName, "Normal" | "???"> = watch("teraType");
  const mechanic: Mechanic = watch("mechanic");

  const getMechanicImg = () => {
    if (mechanic === Mechanic.terastal) {
      return teratypeImage(teratype);
    }
    if (mechanic === Mechanic.dynamax) {
      return gigamax;
    }
    return zMove;
  };

  return (
    <>
      <div className={className}>
        <div
          className={`relative w-28 h-28 flex flex-row justify-center items-center 
          border border-black rounded-full bg-cyan-200 dark:bg-sky-700 shadow-lg `}
        >
          <img
            className={`w-[95%] h-[95%] `}
            src={url ?? missingno}
            alt="Rounded avatar"
          />
          {mechanic !== Mechanic.none && (
            <img
              className="absolute top-20 left-20 w-12 h-12"
              src={getMechanicImg()}
            />
          )}
        </div>
      </div>
    </>
  );
};
