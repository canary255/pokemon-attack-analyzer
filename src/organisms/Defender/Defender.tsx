import { useTranslation } from "react-i18next";
import {
  selectPokemon,
  target,
  boost,
  terrain,
  aura,
  spikes,
} from "../../utils/pokemonConsts";
import { RadioGroupUI } from "../../atom/RadioGroup/RadioGroup";
import { SelectorUI } from "../../atom/Selector/Selector";
import { Divider } from "../../atom/Divider/Divider";
import { SwitchUI } from "../../atom/Switch/Switch";
import { WeatherGroup } from "../../molecules/WeatherGroup/WeatherGroup";

export const Defender = () => {
  const { t } = useTranslation();
  const margin = "mt-3";
  return (
    <>
      <div className="flex flex-col">
        <div className={`${margin} grid place-items-center`}>
          <RadioGroupUI name="selectPokemon" options={selectPokemon} />
        </div>
        <div className={`${margin} grid grid-cols-2 place-items-center`}>
          <SelectorUI
            options={boost}
            label={t("message.defStatBoost")}
            name={"boostDef"}
            width={"XS"}
            height={"S"}
          />
          <SelectorUI
            options={boost}
            label={t("message.spdStatBoost")}
            name={"boostSpd"}
            width={"XS"}
            height={"S"}
          />
        </div>

        <div className={`${margin} grid place-items-center`}>
          <RadioGroupUI options={target} name="target" />
        </div>
        <Divider />
        <div className={`grid place-items-center`}>
          <RadioGroupUI options={terrain} name="terrain" />
        </div>
        <div className={`${margin} grid gap-y-1 place-items-center`}>
          <div>
            <SwitchUI
              className="text-[12px] border border-r-black"
              label={`${t("ruins.tablets")} (-Atk)`}
              circleBorder="left"
              name="tablets"
            />
            <SwitchUI
              className="text-[12px] "
              label={`${t("ruins.vessel")} (-SpA)`}
              circleBorder="right"
              name="vessel"
            />
          </div>
          <div>
            <SwitchUI
              className="text-[12px] border border-r-black"
              label={`${t("ruins.sword")} (-Def)`}
              circleBorder="left"
              name="sword"
            />
            <SwitchUI
              className="text-[12px]"
              label={`${t("ruins.beads")} (-SpD)`}
              circleBorder="right"
              name="beads"
            />
          </div>
        </div>
        <div className={`${margin} grid place-items-center`}>
          <WeatherGroup
            className={`grid grid-cols-5 w-[70%] items-center`}
            name="weather"
          />
        </div>
        <div className={`${margin} grid place-items-center`}>
          <RadioGroupUI options={aura} name="aura" />
        </div>
        <Divider />

        <div className={`grid grid-cols-3 place-items-center`}>
          <SwitchUI label={t("button.protect")} name="protect" />
          <SwitchUI label={t("button.stealthRock")} name="stealthRock" />
          <SwitchUI label={t("button.foresight")} name="foresight" />
        </div>
        <div className={`${margin} grid grid-cols-3 place-items-center`}>
          <SwitchUI label={t("button.helpingHand")} name="helpingHand" />
          <SwitchUI label={t("button.friendGuard")} name="friendGuard" />
          <SwitchUI label={t("button.gravity")} name="gravity" />
        </div>
        <div className={`${margin} grid grid-cols-3 place-items-center`}>
          <SwitchUI label={t("button.lightScreen")} name="lightScreen" />
          <SwitchUI label={t("button.reflect")} name="reflect" />
          <SwitchUI label={t("button.auroraVeil")} name="auroraVeil" />
        </div>
        <div
          className={`${margin} grid grid-cols-4 place-items-center sm:mb-4`}
        >
          <SwitchUI label={t("button.battery")} name="battery" />
          <RadioGroupUI className="col-span-2" options={spikes} name="spikes" />
          <SwitchUI label={t("button.tailwind")} name="tailwind" />
        </div>
      </div>
    </>
  );
};
