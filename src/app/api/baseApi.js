import axios from "axios";
import useAuthStore from "../stores/authStore";
import { router } from "../../index";

const { getState, setState } = useAuthStore;

const baseApi = axios.create({
  baseURL: "http://localhost:3500",
  withCredentials: true,
});

baseApi.interceptors.request.use(
  (config) => {
    const token = getState().token;
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      originalRequest.url !== "/auth/refresh" &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      try {
        originalRequest._retry = true;
        const refreshResult = await baseApi.get("/auth/refresh");
        if (refreshResult?.data) {
          setState({ token: `${refreshResult.data.accessToken}` });
          return baseApi(originalRequest);
        } else {
          throw error;
        }
      } catch (e) {
        throw e;
      }
    }
    setState({ userInfo: { username: "" }, token: "" });
    router.navigate("/loginAgain");
    return Promise.reject(error);
  }
);

export default baseApi;
