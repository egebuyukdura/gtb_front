import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { getCurrencies } from "./currencyApi";

export const Prefetch = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.prefetchQuery("currencies", getCurrencies);
  }, []);
  return <></>;
};
