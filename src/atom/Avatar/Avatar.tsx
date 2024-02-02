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
          className={`relative w-32 h-32 flex flex-row justify-center items-center 
          border border-black rounded-full bg-cyan-200 dark:bg-sky-700 shadow-lg `}
        >
          <img
            className={`w-[90%] h-[90%] drop-shadow-xl`}
            src={url ?? missingno}
            alt="Rounded avatar"
          />
          {mechanic !== Mechanic.none && (
            <img
              className="absolute top-24 left-24  w-10 h-10 "
              src={getMechanicImg()}
            />
          )}
        </div>
      </div>
    </>
  );
};
