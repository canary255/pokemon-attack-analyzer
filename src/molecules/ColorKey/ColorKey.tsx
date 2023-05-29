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
      <div className="flex flex-row gap-x-1 items-center">
        <Sprite isExample className={`${COLOR[color]} w-10 h-10`} />
        <Text className="text-lg">{t(text)}</Text>
      </div>
    );
  };

  return (
    <div className="p-1 grid grid-cols-3 px-8 py-3 gap-x-8">
      <ColorWrapper color="green" text="common.survive" />
      <ColorWrapper color="yellow" text="common.barely" />
      <ColorWrapper color="red" text="common.cannot" />
    </div>
  );
};
