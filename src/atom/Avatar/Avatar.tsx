import { teratypeImage } from "../../utils/teratypeImage";
import missingno from "../../assets/const/Missingno.png";
import { TypeName } from "@smogon/calc/dist/data/interface";

interface AvatarProps {
  className: string;
  url: string | undefined;
  teratype: Exclude<TypeName, "Normal" | "???">;
}

export const Avatar = ({ className, url, teratype }: AvatarProps) => {
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
          <img
            className="absolute top-16 left-16 w-12 h-12"
            src={teratypeImage(teratype)}
          />
        </div>
      </div>
    </>
  );
};
