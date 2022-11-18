import create from "zustand";
import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";

const useCurrencyStore = create((set) => ({
  currencies: {
    btc: { value: "", color: "success.main" },
    eth: { value: "", color: "success.main" },
    bnb: { value: "", color: "success.main" },
    sol: { value: "", color: "success.main" },
    avax: { value: "", color: "success.main" },
    dot: { value: "", color: "success.main" },
    matic: { value: "", color: "success.main" },
    xrp: { value: "", color: "success.main" },
    ada: { value: "", color: "success.main" },
  },
  setCurrencies: (currencies) =>
    set(
      produce((state) => {
        state.currencies.btc.color =
          currencies[0] > state.currencies.btc.value ? "success.main" : "error";
        state.currencies.eth.color =
          currencies[1] > state.currencies.eth.value ? "success.main" : "error";
        state.currencies.bnb.color =
          currencies[2] > state.currencies.bnb.value ? "success.main" : "error";
        state.currencies.sol.color =
          currencies[3] > state.currencies.sol.value ? "success.main" : "error";
        state.currencies.avax.color =
          currencies[4] > state.currencies.avax.value
            ? "success.main"
            : "error";
        state.currencies.dot.color =
          currencies[5] > state.currencies.dot.value ? "success.main" : "error";
        state.currencies.matic.color =
          currencies[6] > state.currencies.matic.value
            ? "success.main"
            : "error";
        state.currencies.xrp.color =
          currencies[7] > state.currencies.xrp.value ? "success.main" : "error";
        state.currencies.ada.color =
          currencies[8] > state.currencies.ada.value ? "success.main" : "error";
        state.currencies.btc.value = currencies[0];
        state.currencies.eth.value = currencies[1];
        state.currencies.bnb.value = currencies[2];
        state.currencies.sol.value = currencies[3];
        state.currencies.avax.value = currencies[4];
        state.currencies.dot.value = currencies[5];
        state.currencies.matic.value = currencies[6];
        state.currencies.xrp.value = currencies[7];
        state.currencies.ada.value = currencies[8];
      })
    ),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Currency Store", useCurrencyStore);
}

export default useCurrencyStore;
