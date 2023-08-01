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
        <Sprite
          isExample
          className={`${COLOR[color]} sm:w-10 sm:h-10 min-[315px]:w-5 min-[315px]:h-5`}
        />
        <Text className="sm:text-lg min-[315px]:text-sm">{t(text)}</Text>
      </div>
    );
  };

  return (
    <div className="flex  py-3 justify-center md:gap-x-12 min-[315px]:gap-x-8">
      <ColorWrapper color="green" text="common.survive" />
      <ColorWrapper color="yellow" text="common.barely" />
      <ColorWrapper color="red" text="common.cannot" />
    </div>
  );
};
