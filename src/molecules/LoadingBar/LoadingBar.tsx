import { Text } from "../../atom/Text/Text";

export const LoadingBar = ({ width }: { width: string }) => {
  const percentage = width;

  return (
    <div className="w-[50%] h-full relative">
      <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded-md overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-md"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <Text className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold">
        {percentage}%
      </Text>
    </div>
  );
};
