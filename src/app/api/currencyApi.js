import baseApi from "./baseApi";

export const getCurrencies = async () => {
  const response = await baseApi.get("/currency");
  return response.data;
};
