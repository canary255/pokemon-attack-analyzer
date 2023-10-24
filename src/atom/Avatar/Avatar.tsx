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
          className={`relative w-48 h-48 flex flex-row justify-center items-center border border-black rounded-full bg-cyan-200 dark:bg-sky-700`}
        >
          <img
            className={`w-[70%] h-[70%] `}
            src={url ?? missingno}
            alt="Rounded avatar"
          />
          <img
            className="absolute top-32 left-40 w-16 h-16"
            src={teratypeImage(teratype)}
          />
        </div>
      </div>
    </>
  );
};
