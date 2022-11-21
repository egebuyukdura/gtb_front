import "./Home.css";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useInterval } from "../../../hooks/useInterval";

import { HashLoader } from "react-spinners";
import { BiPaste } from "react-icons/bi";
import fromExponential from "from-exponential";

import {
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Link,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Tooltip,
  Backdrop,
} from "@mui/material";

import useTokenStore from "../../../app/stores/tokenStore";
import useAuthStore from "../../../app/stores/authStore";
import useCurrencyStore from "../../../app/stores/currencyStore";

import { fetchWalletBalance } from "../../../app/api/balanceApi";
import {
  fetchTokenStatics,
  fetchTokenDynamics,
} from "../../../app/api/tokenApi";

export default function Home() {
  const [tempTokenAddress, setTempTokenAddress] = useState("");
  const [tokenAddressError, setTokenAddressError] = useState(false);
  const [tokenAddressErrorText, setTokenAddressErrorText] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [buyOutput, setBuyOutput] = useState("");
  const [buyGasPrice, setBuyGasPrice] = useState("5");
  const [buyGasLimit, setBuyGasLimit] = useState("1000000");
  const [sellAmount, setSellAmount] = useState("");
  const [sellOutput, setSellOutput] = useState("");
  const [sellGasPrice, setSellGasPrice] = useState("5");
  const [sellGasLimit, setSellGasLimit] = useState("1000000");

  const wallet = useAuthStore((state) => state.userInfo.wallets[0]);
  const setBalance = useAuthStore((state) => state.setBalance);

  const tokenAddress = useTokenStore((state) => state.address);
  const tokenStatics = useTokenStore((state) => state.statics);
  const tokenDynamics = useTokenStore((state) => state.dynamics);
  const setAddress = useTokenStore((state) => state.setAddress);
  const setStatics = useTokenStore((state) => state.setStatics);
  const setDynamics = useTokenStore((state) => state.setDynamics);

  const bnbPrice = useCurrencyStore((state) => state.currencies.bnb.value);

  const queryClient = useQueryClient();

  const staticsMutation = useMutation(fetchTokenStatics, {
    onSuccess: (data) => {
      queryClient.cancelQueries({ queryKey: ["dynamics"], exact: true });
      queryClient.resetQueries({ queryKey: ["dynamics"], exact: true });
      setTokenAddressError(false);
      setTokenAddressErrorText("");
      setStatics(data);
      setAddress(tempTokenAddress);
      setTempTokenAddress("");
    },
    onError: (error) => {
      setTokenAddressError(true);
      if (error === "NA") {
        setTokenAddressErrorText("Please enter a valid address.");
      } else if (error === "NT") {
        setTokenAddressErrorText(
          "The address you have entered is not a token address."
        );
      } else if (error === "EMPTY") {
        setTokenAddressErrorText("Please enter a token address.");
      } else {
        setTokenAddressErrorText(
          "An error occurred while importing the token."
        );
      }
    },
  });

  const dynamicsMutation = useMutation(
    () =>
      fetchTokenDynamics(
        tokenAddress,
        wallet.address,
        tokenStatics.decimals,
        bnbPrice
      ),
    {
      onSuccess: (data) => {
        setDynamics(data);
      },
    }
  );

  const setContentData = async (e) => {
    e.preventDefault();
    await staticsMutation.mutateAsync(tempTokenAddress);
  };

  const pasteTokenAddress = async (e) => {
    const clip = await navigator.clipboard.readText();
    setTempTokenAddress(clip);
  };

  useQuery("balances", () => fetchWalletBalance(wallet.address), {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 1000,
    onSuccess: (data) => {
      setBalance(data);
    },
  });

  useInterval(() => {
    if (!!tokenAddress && !staticsMutation.isLoading) {
      dynamicsMutation.mutateAsync();
    }
  }, 1000);

  /* const { isLoading } = useQuery(
    "dynamics",
    () =>
      fetchTokenDynamics(
        tokenAddress,
        wallet.address,
        tokenStatics.decimals,
        bnbPrice
      ),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchInterval: 1000,
      onSuccess: (data) => {
        setDynamics(data);
      },
      enabled: !!tokenAddress,
    }
  ); */

  return (
    <div className="home" style={{ height: "100%" }}>
      <Backdrop
        open={staticsMutation.isLoading /* || dynamicsMutation.isLoading */}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <HashLoader
          className="loader"
          color="#36d7b7"
          size={100}
          speedMultiplier={0.8}
        />
      </Backdrop>
      <Grid container sx={{ height: "100%" }}>
        <Grid container item spacing={1} xs={3}>
          <Grid item xs={12}>
            <h2>Analysis</h2>
          </Grid>
          <Grid item xs={12}>
            <h2>Extra Functions</h2>
          </Grid>
        </Grid>
        <Grid container item xs={9}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={3}
              sx={{
                justifyContent: "center",
              }}
            >
              <Typography>
                Wallet Address:{" "}
                {wallet.address.substr(0, 4) +
                  "..." +
                  wallet.address.substr(
                    wallet.address.length - 4,
                    wallet.address.length
                  )}
              </Typography>
              <Typography>
                Balance:{" "}
                {wallet.balance ? wallet.balance.substr(0, 6) + " BNB" : ""}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="column"
              spacing={3}
              sx={{ justifyContent: "center" }}
            >
              <Box>
                <Typography>Token Address: {tokenAddress}</Typography>
              </Box>
              <Box>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "center" }}
                >
                  <Typography>
                    {tokenStatics.name} ({tokenStatics.symbol}/
                    {tokenDynamics.pair})
                  </Typography>
                  <Typography>
                    Token Price: $
                    {tokenDynamics.price
                      ? fromExponential(tokenDynamics.price)
                      : ""}
                  </Typography>
                  <Typography>
                    Total Supply:{" "}
                    {tokenDynamics.supply.replace(
                      /(\d)(?=(\d\d\d)+(?!\d))/g,
                      "$1."
                    )}
                  </Typography>
                </Stack>
              </Box>
              <Box component="form" onSubmit={setContentData}>
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ justifyContent: "center" }}
                >
                  <TextField
                    size="small"
                    placeholder="0x..."
                    sx={{ width: "475px" }}
                    onChange={(e) => setTempTokenAddress(e.target.value)}
                    value={tempTokenAddress}
                    error={tokenAddressError}
                    helperText={tokenAddressErrorText}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Paste">
                            <IconButton onClick={pasteTokenAddress} edge="end">
                              <BiPaste />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button variant="outlined" type="submit">
                    Import
                  </Button>
                </Stack>
              </Box>
              <Box>
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ justifyContent: "center" }}
                >
                  <Link
                    href={"https://poocoin.app/tokens/" + tokenAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chart
                  </Link>
                  <Link
                    href={"https://bscscan.com/address/" + tokenAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Transactions
                  </Link>
                  <Link
                    href={
                      "https://bscscan.com/address/" + tokenAddress + "#code"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contract
                  </Link>
                  <Link
                    href={
                      "https://bscscan.com/token/" + tokenAddress + "#balances"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Holders
                  </Link>
                </Stack>
              </Box>
              <Box>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "center" }}
                >
                  <Typography>Marketcap: ${tokenDynamics.marketcap}</Typography>
                  <Typography>
                    Liquidity Pair: {tokenDynamics.liquidity}{" "}
                    {tokenDynamics.pair} ($
                    {tokenDynamics.dollarLiquidity})
                  </Typography>
                  <Typography>Tax: {}</Typography>
                </Stack>
              </Box>
              {/* <Box>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Typography>
                    Balance: {tokenDynamics.balance + " " + tokenStatics.symbol}
                  </Typography>
                  {approveState ? (
                    <Button
                      variant="outlined"
                      onClick={() => approve(tokenAddress, false)}
                    >
                      Revoke
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => approve(tokenAddress, true)}
                    >
                      Approve
                    </Button>
                  )}
                </Stack>
              </Box> */}
            </Stack>
          </Grid>
          {/* <Grid container item spacing={2} xs={12}>
            <Grid item xs={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent sx={{ height: "100%" }}>
                  <h2>Buy</h2>
                  <Stack
                    direction="column"
                    spacing={3}
                    sx={{ justifyContent: "center" }}
                  >
                    <Box>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{ justifyContent: "center" }}
                      >
                        <TextField
                          size="small"
                          onChange={(e) => setBuyAmount(e.target.value)}
                          value={buyAmount}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                BNB
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Button
                          size="small"
                          variant="outlined"
                          color="grey"
                          onClick={() => setBuyAmount(mainData.balance)}
                        >
                          Max
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            buy(
                              mainData.tokenAddress,
                              mainData.tokenPair,
                              buyAmount
                            )
                          }
                        >
                          Buy
                        </Button>
                      </Stack>
                    </Box>
                    <Box>
                      <Typography>
                        You'll receive{" "}
                        {buyOutput ? fromExponential(buyOutput) : " "}{" "}
                        {mainData.tokenSymbol ? mainData.tokenSymbol : "TOKEN"}{" "}
                        in return.
                      </Typography>
                    </Box>
                    <Box>
                      <Stack direction="column" spacing={2}>
                        <Typography variant="h6">
                          Buy with Custom Gas Price
                        </Typography>
                        <Box>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                              justifyContent: "center",
                            }}
                          >
                            <Typography sx={{ alignSelf: "center" }}>
                              Gas Price:
                            </Typography>
                            <TextField
                              size="small"
                              sx={{ width: "100px" }}
                              onChange={(e) => setBuyGasPrice(e.target.value)}
                              value={buyGasPrice}
                            />
                            <Typography sx={{ alignSelf: "center" }}>
                              Gas Limit:
                            </Typography>
                            <TextField
                              size="small"
                              sx={{ width: "100px" }}
                              onChange={(e) => setBuyGasLimit(e.target.value)}
                              value={buyGasLimit}
                            />
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() =>
                                buyCustomGas(
                                  mainData.tokenAddress,
                                  mainData.tokenPair,
                                  buyAmount,
                                  buyGasPrice,
                                  buyGasLimit
                                )
                              }
                            >
                              Buy
                            </Button>
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent sx={{ height: "100%" }}>
                  <h2>Sell</h2>
                  <Stack
                    direction="column"
                    spacing={3}
                    sx={{ justifyContent: "center" }}
                  >
                    <Box>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{ justifyContent: "center" }}
                      >
                        <TextField
                          size="small"
                          onChange={(e) => setSellAmount(e.target.value)}
                          value={sellAmount}
                          pr="0"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {mainData.tokenSymbol
                                  ? mainData.tokenSymbol
                                  : "TOKEN"}
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Button
                          size="small"
                          variant="outlined"
                          color="grey"
                          onClick={() => setSellAmount(mainData.tokenBalance)}
                        >
                          Max
                        </Button>
                        {approveState ? (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                              sell(
                                mainData.tokenAddress,
                                mainData.tokenPair,
                                mainData.tokenDecimals,
                                sellAmount
                              )
                            }
                          >
                            Sell
                          </Button>
                        ) : (
                          <Tooltip title="You need to Approve first.">
                            <span>
                              <Button disabled variant="outlined">
                                Sell
                              </Button>
                            </span>
                          </Tooltip>
                        )}
                      </Stack>
                    </Box>
                    <Box>
                      <Typography>
                        You'll receive{" "}
                        {sellOutput ? fromExponential(sellOutput) : " "} BNB in
                        return.
                      </Typography>
                    </Box>
                    <Box>
                      <Stack direction="column" spacing={2}>
                        <Typography variant="h6">
                          Sell with Custom Gas Price
                        </Typography>
                        <Box>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                              justifyContent: "center",
                            }}
                          >
                            <Typography sx={{ alignSelf: "center" }}>
                              Gas Price:
                            </Typography>
                            <TextField
                              size="small"
                              sx={{ width: "100px" }}
                              onChange={(e) => setSellGasPrice(e.target.value)}
                              value={sellGasPrice}
                            />
                            <Typography sx={{ alignSelf: "center" }}>
                              Gas Limit:
                            </Typography>
                            <TextField
                              size="small"
                              sx={{ width: "100px" }}
                              onChange={(e) => setSellGasLimit(e.target.value)}
                              value={sellGasLimit}
                            />
                            {approveState ? (
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() =>
                                  sell(
                                    mainData.tokenAddress,
                                    mainData.tokenPair,
                                    mainData.tokenDecimals,
                                    sellAmount,
                                    sellGasPrice,
                                    sellGasLimit
                                  )
                                }
                              >
                                Sell
                              </Button>
                            ) : (
                              <Tooltip title="You need to Approve first.">
                                <span>
                                  <Button disabled variant="outlined">
                                    Sell
                                  </Button>
                                </span>
                              </Tooltip>
                            )}
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid> */}
          <Grid item xs={12}>
            <h2>Messages</h2>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
