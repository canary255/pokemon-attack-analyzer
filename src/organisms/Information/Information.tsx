import { useTranslation } from "react-i18next";
import { Button } from "../../atom/Button/Button";
import { Modal } from "../../atom/Modal/Modal";
import { useState } from "react";

export const Information = () => {
  let [isOpenModal, setIsOpenModal] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-y-2 px-3 py-6">
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() => setIsOpenModal(!isOpenModal)}
          className="w-12 h-12 rounded-full border-transparent bg-white text-xl font-bold text-gray-600 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          <span className="text-3xl">?</span>
        </Button>
        <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
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
    </div>
  );
};
