import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../Button/Button";
import { useTranslation } from "react-i18next";
import { Text } from "../Text/Text";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal = ({ isOpen, setIsOpen }: Props) => {
  const { t } = useTranslation();

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-700 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-black dark:text-white"
                  >
                    About the application
                  </Dialog.Title>
                  <div className="mt-2 bg-gray-100 dark:bg-gray-800 shadow-lg p-4 rounded-md">
                    <div>
                      <Text className=" font-sm">
                        Pokémon Attack Analyzer{" "}
                        {t("projectExplain.description")}
                      </Text>
                    </div>
                    <div>
                      <div className="py-3 flex flex-col">
                        <Text className="text-xl font-medium">
                          {t("common.instructions")}
                        </Text>
                        <ul className="list-disc pl-6 text-sm font-semibold dark:text-white">
                          <li>{t("projectExplain.step1")}</li>
                          <li>{t("projectExplain.step2")}</li>
                          <li>{t("projectExplain.step3")}</li>
                          <li>{t("projectExplain.step4")}</li>
                          <li>{t("projectExplain.step5")}</li>
                          <li>{t("projectExplain.step6")}</li>
                          <li className="font-bold text-[15px]">
                            {t("projectExplain.step7")}
                          </li>
                        </ul>
                        <Text className="font-medium text-[17px] my-4">
                          {t("projectExplain.note")}
                        </Text>
                      </div>
                      <p className="text-left dark:text-white">
                        {t("common.madeBy")} @Canary255
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      type="button"
                      className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
