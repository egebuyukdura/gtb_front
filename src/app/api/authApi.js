import baseApi from "./baseApi";

export const login = async (creds) => {
  const response = await baseApi.post("/auth", creds);
  console.log(response.data);
  return response.data;
};

export const refresh = async () => {
  const response = await baseApi.get("/auth/refresh");
  return response.data;
};
