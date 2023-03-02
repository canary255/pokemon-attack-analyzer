import { teratypeImage } from "../../utils/teratypeImage";

interface AvatarProps {
  className: string;
  url: string | undefined;
  teratype: string;
}

export const Avatar = ({ className, url, teratype }: AvatarProps) => {
  //TODO: Añadir el logo del teratipo que haya seleccionado el usuario
  return (
    <>
      <div className={className}>
        <div
          className={`relative w-48 h-48 flex flex-row justify-center items-center border border-black rounded-full bg-cyan-200`}
        >
          <img
            className={`w-[70%] h-[70%] `}
            src={
              url ??
              "https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png"
            }
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
