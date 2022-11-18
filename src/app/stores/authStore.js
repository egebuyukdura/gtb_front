import create from "zustand";
import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";

const useAuthStore = create((set) => ({
  userInfo: {
    username: "",
    tier: "",
  },
  token: null,
  login: (user, tier, token) =>
    set(
      produce((state) => {
        state.userInfo.username = user;
        state.userInfo.tier = tier;
        state.token = token;
      })
    ),
  logout: () =>
    set(
      produce((state) => {
        state.userInfo.username = "";
        state.userInfo.tier = "";
        state.token = "";
      })
    ),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Auth Store", useAuthStore);
}

export default useAuthStore;
