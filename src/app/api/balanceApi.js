import baseApi from "./baseApi";

export const fetchWalletBalance = async (walletAddress) => {
  try {
    const response = await baseApi.post("/balance", {
      wAddress: walletAddress,
    });
    return response.data;
  } catch (err) {
    console.log(err.response);
    return Promise.reject(err);
  }
};
