import { Avatar } from "../../atom/Avatar/Avatar";
import { Button } from "../../atom/Button/Button";
import { ComboBoxUI } from "../../atom/ComboBox/ComboBox";
import { SelectorUI } from "../../atom/Selector/Selector";
import { SwitchUI } from "../../atom/Switch/Switch";
import { Stats } from "../../molecules/Stats/Stats";
import { useTranslation } from "react-i18next";
import { nature } from "../../utils/pokemonConsts/nature";

export const Attacker = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col">
        <Avatar className="flex flex-row justify-center mt-5" />
        <div className=" mt-3 grid place-items-center sm:grid-cols-2 xs:grid-cols-1 gap-x-2">
          <ComboBoxUI
            options={[]}
            name="name"
            label={t("attacker.selectPokemon")}
          />
          <SelectorUI
            options={nature}
            name="teraType"
            label={t("attacker.selectTeraType")}
          />
        </div>
        <div className="mt-3 grid place-items-center sm:grid-cols-2  xs:grid-cols-1 gap-x-2">
          <ComboBoxUI
            options={[]}
            name="ability"
            label={t("attacker.selectAbility")}
          />
          <ComboBoxUI
            options={[]}
            name="item"
            label={t("attacker.selectItem")}
          />
        </div>
        <div className="mt-3 grid place-items-center sm:grid-cols-4 xs:grid-cols-1">
          <div className="flex col-span-3 flex-row gap-x-2">
            <ComboBoxUI
              options={[]}
              name="move"
              width="L"
              label={t("attacker.selectMove")}
            />
            <SelectorUI
              options={nature}
              width="XS"
              name="category"
              label={t("attacker.category")}
            />
          </div>
          <SwitchUI
            circleBorder="all"
            label={t("button.crit")}
            className="mt-7 "
            name="crit"
          />
        </div>
        <div className="mt-3 grid grid-cols-2 place-items-center  gap-x-2">
          <SelectorUI
            name="nature"
            options={nature}
            label={t("attacker.nature")}
            selectorAbove
          />
          <div>
            <Button
              circleBorder="left"
              label={t("button.zMove")}
              className="mt-6 w-20"
              name="zMove"
            />
            <Button
              circleBorder="none"
              label={t("button.dynamax")}
              className="mt-6 w-20"
              name="dynamax"
            />
            <Button
              circleBorder="right"
              label={t("button.tera")}
              className="mt-6 w-20"
              name="tera"
            />
          </div>
        </div>
        <div className="mt-3 grid place-items-center  gap-x-2">
          <Stats />
        </div>
      </div>
    </>
  );
};
