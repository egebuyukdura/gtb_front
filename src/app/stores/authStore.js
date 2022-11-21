import create from "zustand";
import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";

const useAuthStore = create((set) => ({
  userInfo: {
    username: "",
    tier: "",
    wallets: [
      {
        address: process.env.REACT_APP_WALLET_ADDRESS,
        privKey: process.env.REACT_APP_PRIV_KEY,
        balance: "",
      },
    ],
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
  setBalance: (balance) =>
    set(
      produce((state) => {
        state.userInfo.wallets[0].balance = balance;
      })
    ),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Auth Store", useAuthStore);
}

export default useAuthStore;
