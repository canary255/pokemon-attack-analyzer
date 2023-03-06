import { Button } from "../../atom/Button/Button";
import { Text } from "../../atom/Text/Text";

export const Information = () => {
  return (
    <div className="grid grid-rows-3 gap-y-6">
      <div className="p-3">
        <Text className="text-xl font-medium">Pokémon Report Generator</Text>
        <Text className="text-sm font-medium">
          is a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          sagittis pellentesque sagittis. Nam tincidunt, enim id commodo
          finibus, quam tortor elementum nibh, eget imperdiet erat magna
          vulputate magna. Maecenas lacinia, sem ac euismod sodales, augue
          turpis dignissim felis, sit amet tempus magna ante vitae nunc.{" "}
        </Text>
      </div>
      <div className="p-3">
        <Text className="text-xl font-medium">Instructions:</Text>
        <ul className="list-disc pl-6 text-sm font-semibold dark:text-white">
          <li>Lorem ipsum dolor sit amet</li>
          <li>Consectetur adipiscing elit</li>
          <li>Proin sagittis pellentesque sagittis</li>
          <li>Nam tincidunt, enim id commodo finibus</li>
          <li>Quam tortor elementum nibh</li>
          <li>Eget imperdiet erat magna vulputate magna.</li>
        </ul>
      </div>

      <div className="items-end flex justify-center">
        <Button
          name="upload"
          type="submit"
          circleBorder="all"
          className="w-80 h-36 text-4xl font-semibold"
          label="generate report!"
        />
      </div>
    </div>
  );
};
