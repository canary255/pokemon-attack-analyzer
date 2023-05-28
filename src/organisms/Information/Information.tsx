import { useTranslation } from "react-i18next";
import { Button } from "../../atom/Button/Button";
import { Text } from "../../atom/Text/Text";

export const Information = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-y-3 p-3">
      <div>
        <Text className="text-xl font-medium">
          {t("common.reportGenerator")}{" "}
        </Text>
        <Text className="text-sm font-medium">
          {t("proyectExplain.description")}
        </Text>
      </div>
      <div>
        <div className="py-3 flex flex-col">
          <Text className="text-xl font-medium">Instructions:</Text>
          <ul className="list-disc pl-6 text-sm font-semibold dark:text-white">
            <li>{t("proyectExplain.step1")}</li>
            <li>{t("proyectExplain.step2")}</li>
            <li>{t("proyectExplain.step3")}</li>
            <li>{t("proyectExplain.step4")}</li>
            <li>{t("proyectExplain.step5")}</li>
            <li>{t("proyectExplain.step6")}</li>
            <li className="font-bold text-[15px]">
              {t("proyectExplain.step7")}
            </li>
          </ul>
          <Text className="font-medium text-[17px] my-8">
            {t("proyectExplain.note")}
          </Text>
        </div>
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
