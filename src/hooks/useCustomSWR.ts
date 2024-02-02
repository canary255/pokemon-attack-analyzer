import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

type SWRProps = {
  url: string | null;
  revalidateIfStale?: boolean;
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
};

export const useCustomSWR = <T>({
  url,
  revalidateIfStale = false,
  revalidateOnFocus = false,
  revalidateOnReconnect = false,
}: SWRProps) => {
  const { data, error, isLoading, mutate, isValidating } = useSWR<T>(
    url,
    fetcher,
    {
      revalidateIfStale,
      revalidateOnFocus,
      revalidateOnReconnect,
    }
  );

  return { data, error, isLoading, mutate, isValidating };
};
