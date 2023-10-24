import { ReportProps } from "../../types/reportProps";
import { CalcList } from "../../types/calcList";

type ReportPDFProps = {
  avatar?: string;
  data: ReportProps | undefined;
  resultsCalcs: CalcList[] | undefined;
};

const bgColor = (ko_chance?: { chance?: number; n: number; text: string }) => {
  if (!ko_chance || ko_chance.chance === undefined) return "bg-green-200";
  if (ko_chance.chance === 1 && ko_chance.n === 1) return "bg-red-300";
  if (ko_chance.chance < 1 && ko_chance.n === 1) return "bg-yellow-300";
  return "bg-green-200";
};

const PAGE_CLASS = "w-[650px] h-[1136px] break-after-page";

// Create Document Component
export const ReportPDF = ({ avatar, data, resultsCalcs }: ReportPDFProps) => (
  <>
    <div className={` ${PAGE_CLASS} flex flex-col items-center `}>
      <img width="128" height="128" src={avatar} />
      <p className="text-2xl font-bold">
        Can you survive {data?.name} {data?.move}?
      </p>
    </div>
    <div>
      {resultsCalcs?.map((calc, i) => (
        <>
          <div className={`flex flex-col h-[378.50px] pl-4`}>
            <div className="flex flex-row gap-x-3 h-[100px] justify-start items-center">
              <p className="text-xl">Vs. {calc.pokemon}</p>
              <img width="100" height="100" src={calc.img} />
            </div>

            {calc.calcSet && (
              <div
                className={`${
                  calc.calcSet && bgColor(calc.calcSet.ko_chance)
                } h-[100px] mb-1 px-2`}
              >
                <p className="font-bold text-left">
                  Pokemon with set: {calc.calcSet.text_evs}
                </p>
                <p className="text-sm text-left">{calc.calcSet.description}</p>
              </div>
            )}
            {calc.calcExtreme && (
              <div
                className={`${bgColor(
                  calc.calcExtreme.ko_chance
                )} h-[100px] px-2`}
              >
                <p className="font-bold text-left">
                  Pokémon with Defensive set: {calc.calcExtreme.text_evs}
                </p>
                <p className="text-sm text-left">
                  {calc.calcExtreme.description}
                </p>
              </div>
            )}
          </div>
        </>
      ))}
    </div>
  </>
);
