import { useTranslation } from "react-i18next";
import { Sprite } from "../../atom/Sprite/Sprite";
import { Text } from "../../atom/Text/Text";
import { COLOR } from "../../utils/color";

export const ColorKey = () => {
  const { t } = useTranslation();

  const ColorWrapper = ({
    color,
    text,
  }: {
    color: "red" | "yellow" | "green";
    text: string;
  }) => {
    return (
      <div className="flex flex-row gap-x-9 items-center">
        <Sprite src="" className={`${COLOR[color]} w-8 h-8`} />
        <Text className="text-lg">{t(text)}</Text>
      </div>
    );
  };

  return (
    <div className="p-2 flex flex-col gap-y-2">
      <ColorWrapper color="green" text="common.canSurvive" />
      <ColorWrapper color="yellow" text="common.barelySurvive" />
      <ColorWrapper color="red" text="common.cannotSurvive" />
    </div>
  );
};
