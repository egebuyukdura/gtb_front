import create from "zustand";
import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";

const useTokenStore = create((set) => ({
  address: "",
  statics: {
    name: "",
    symbol: "",
    decimals: "",
  },
  dynamics: {
    supply: "",
    balance: "",
    pair: "",
    liquidity: "",
    dollarLiquidity: "",
    price: "",
    marketcap: "",
    tax: "",
    approval: "",
  },
  setAddress: (address) =>
    set(
      produce((state) => {
        state.address = address;
      })
    ),

  setStatics: (statics) =>
    set(
      produce((state) => {
        state.statics.name = statics.tokenName;
        state.statics.symbol = statics.tokenSymbol;
        state.statics.decimals = statics.tokenDecimals;
      })
    ),
  setDynamics: (dynamics) =>
    set(
      produce((state) => {
        state.dynamics.balance = dynamics.tokenBalance;
        state.dynamics.pair = dynamics.tokenPair;
        state.dynamics.liquidity = dynamics.tokenLiq;
        state.dynamics.dollarLiquidity = dynamics.tokenDollarLiq;
        state.dynamics.price = dynamics.tokenPrice;
        state.dynamics.marketcap = dynamics.tokenMCap;
        state.dynamics.approval = dynamics.tokenApproval;
        state.dynamics.supply = dynamics.tokenSupply;
      })
    ),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Token Store", useTokenStore);
}

export default useTokenStore;
