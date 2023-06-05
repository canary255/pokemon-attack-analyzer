import { useTranslation } from "react-i18next";
import { Button } from "../../atom/Button/Button";
import { Text } from "../../atom/Text/Text";

export const Information = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-y-2 p-3">
      <div>
        <Text className="text-xl font-medium">Pokémon Report Generator</Text>
        <Text className="text-sm font-medium">
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

      <div className="items-end flex justify-center">
        <Button
          name="upload"
          type="submit"
          circleBorder="all"
          className="w-80 h-36 text-4xl font-semibold"
          label={t("button.generateReport")}
        />
      </div>
    </div>
  );
};
