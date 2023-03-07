import { useTranslation } from "react-i18next";
import { Button } from "../../atom/Button/Button";
import { Text } from "../../atom/Text/Text";

export const Information = () => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-rows-3 gap-y-3">
      <div className="p-3">
        <Text className="text-xl font-medium">
          {t("common.reportGenerator")}{" "}
        </Text>
        <Text className="text-sm font-medium">
          {t("proyectExplain.description")}
        </Text>
      </div>
      <div>
        <div className="p-3">
          <Text className="text-xl font-medium">Instructions:</Text>
          <ul className="list-disc pl-6 text-sm font-semibold dark:text-white">
            <li>{t("proyectExplain.step1")}</li>
            <li>{t("proyectExplain.step2")}</li>
            <li>{t("proyectExplain.step3")}</li>
            <li>{t("proyectExplain.step4")}</li>
            <li>{t("proyectExplain.step5")}</li>
            <li>{t("proyectExplain.step6")}</li>
          </ul>
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
