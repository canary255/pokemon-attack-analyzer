import { useTranslation } from "react-i18next";
import { Button } from "../../atom/Button/Button";
import { Modal } from "../../atom/Modal/Modal";
import { useState } from "react";
import { Text } from "../../atom/Text/Text";
import { RadioGroupUI } from "../../atom/RadioGroup/RadioGroup";
import { Checkbox } from "../../atom/Checkbox/Checkbox";

export const Information = () => {
  let [isOpenModal, setIsOpenModal] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <div className="h-3/4 flex flex-col gap-y-4 p-3">
        <div className="flex w-full">
          <Text className="flex justify-start items-center font-medium text-2xl w-1/2">
            {t("common.additionalOptions")}
          </Text>
          <div className="flex justify-end w-1/2">
            <Button
              type="button"
              onClick={() => setIsOpenModal(!isOpenModal)}
              className="w-12 h-12 rounded-full border-transparent bg-white text-xl font-bold text-gray-600 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              <span className="text-3xl">?</span>
            </Button>
          </div>
          <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
        </div>
        <div className="flex items-center gap-x-1">
          <Text className="font-medium w-52">
            {t("common.everyPokemonHasAV")}
          </Text>
          <Checkbox name="av" />
        </div>
        <div className="flex items-center gap-x-1">
          <Text className="font-medium w-52">{t("common.pokemonLevel")}</Text>
          <RadioGroupUI
            options={[
              { name: "Level 50", value: "50" },
              { name: "Level 100", value: "100" },
            ]}
            name="level"
          ></RadioGroupUI>
        </div>
      </div>
      <div className="items-end flex justify-center">
        <Button
          name="upload"
          type="submit"
          circleBorder="all"
          className="w-64 h-36 text-4xl font-semibold"
          label={t("button.generateReport")}
        />
      </div>
    </>
  );
};
