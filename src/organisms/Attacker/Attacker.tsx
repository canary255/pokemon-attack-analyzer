import { Avatar } from "../../atom/Avatar/Avatar";
import { ComboBoxUI } from "../../atom/ComboBox/ComboBox";
import { SelectorUI } from "../../atom/Selector/Selector";
import { SwitchUI } from "../../atom/Switch/Switch";
import { Stats } from "../../molecules/Stats/Stats";
import { useTranslation } from "react-i18next";
import { nature, mechanic, category } from "../../utils/pokemonConsts";
import { RadioGroupUI } from "../../atom/RadioGroup/RadioGroup";

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
        <div className="mt-3 grid w-full place-items-center xs:grid-cols-1">
          <div className="flex flex-row gap-x-2">
            <ComboBoxUI
              options={[]}
              name="move"
              width="L"
              label={t("attacker.selectMove")}
            />
            <SelectorUI
              options={category}
              width="XS"
              name="category"
              label={t("attacker.category")}
            />
            <SwitchUI label={t("button.crit")} className="mt-5 " name="crit" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 place-items-center gap-x-2">
          <SelectorUI
            name="nature"
            options={nature}
            label={t("attacker.nature")}
            selectorAbove
          />
          <div>
            <RadioGroupUI className="mt-7" name="mechanic" options={mechanic} />
          </div>
        </div>
        <div className="mt-3 grid place-items-center  gap-x-2">
          <Stats />
        </div>
      </div>
    </>
  );
};
