import { useTranslation } from "react-i18next";
import { Button } from "../../atom/Button/Button";
import { Modal } from "../../atom/Modal/Modal";
import { useState } from "react";
import { Text } from "../../atom/Text/Text";
import { SwitchUI } from "../../atom/Switch/Switch";
import { RadioGroupUI } from "../../atom/RadioGroup/RadioGroup";

export const Information = () => {
  let [isOpenModal, setIsOpenModal] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col px-3 py-3 h-full">
      <div className="h-3/4 flex flex-col gap-y-4">
        <div className="flex w-full">
          <Text className="flex justify-start items-center font-medium text-2xl w-1/2">
            Additional options
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
        <div className="flex items-center gap-x-4">
          <Text className="font-medium w-1/2">
            Every Pokémon Has Assault Vest
          </Text>
          <SwitchUI className="w-10 " name="av" label={"X"}></SwitchUI>
        </div>
        <div className="flex items-center gap-x-4">
          <Text className="font-medium w-1/2">Pokémon Level</Text>
          <RadioGroupUI
            options={[
              { name: "Level 50", value: "50" },
              { name: "Level 100", value: "100" },
            ]}
            name="level"
          ></RadioGroupUI>
        </div>
      </div>
      <div className="items-end flex justify-center h-1/4">
        <Button
          name="upload"
          type="submit"
          circleBorder="all"
          className="w-64 h-36 text-4xl font-semibold"
          label={t("button.generateReport")}
        />
      </div>
    </div>
  );
};
