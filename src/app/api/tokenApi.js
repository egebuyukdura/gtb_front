import baseApi from "./baseApi";

export const fetchTokenStatics = async (tokenAddress) => {
  try {
    const response = await baseApi.post("/token/statics", {
      tAddress: tokenAddress,
    });
    return response.data;
  } catch (err) {
    if (err.response.data.message === "Please enter a valid token address.") {
      // Entered address is not a valid address = NOT ADDRESS
      return Promise.reject("NA");
    } else if (
      err.response.data.message ===
      "The address you have entered is not a token address."
    ) {
      // Entered address is not a valid TOKEN address = NOT TOKEN
      return Promise.reject("NT");
    } else if (err.response.data.message === "All fields are required.") {
      return Promise.reject("EMPTY");
    } else {
      return Promise.reject(err);
    }
  }
};

export const fetchTokenDynamics = async (
  tokenAddress,
  walletAddress,
  tokenDecimals,
  bnbPrice
) => {
  try {
    const response = await baseApi.post("/token/dynamics", {
      tAddress: tokenAddress,
      wAddress: walletAddress,
      tDecimals: tokenDecimals,
      bnbPrice: bnbPrice,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
