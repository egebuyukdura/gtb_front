import "./Header.css";

import Settings from "./Settings";

import { useState, useRef } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getCurrencies } from "../../../app/api/currencyApi";
import useAuthStore from "../../../app/stores/authStore";
import useCurrencyStore from "../../../app/stores/currencyStore";

import { Grid, IconButton, Stack, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

import { BsMoonStars } from "react-icons/bs";
import { SlSettings } from "react-icons/sl";
import { TbGasStation } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";

export default function Header({ darkModeToggle }) {
  const navigate = useNavigate();
  const currencies = useCurrencyStore((state) => state.currencies);
  const setCurrencies = useCurrencyStore((state) => state.setCurrencies);
  const logoutStore = useAuthStore((state) => state.logout);
  const [settingsModal, setSettingsModal] = useState(false);
  const containerRef = useRef(null);
  const [slideTrigger, setSlideTrigger] = useState(true);
  const [slideDirection, setSlideDirection] = useState("left");

  const handleOpenSettings = () => {
    setSettingsModal(true);
  };

  const handleCloseSettings = () => {
    setSettingsModal(false);
  };

  const slideRestart = () => {
    setSlideTrigger(!slideTrigger);
    setSlideTrigger(!slideTrigger);
  };

  const { isSuccess, data } = useQuery("currencies", getCurrencies, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
    onError: (error) => {
      if (error.response.status === 403) {
        logoutStore();
        navigate("/");
      }
    },
    onSuccess: (data) => {
      setCurrencies(data);
    },
  });

  return (
    <div className="header" style={{ height: "100%" }}>
      <Dialog open={settingsModal} onClose={handleCloseSettings}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Testing the Settings screen. Helloooo!
          </DialogContentText>
          <Settings />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSettings}>Cancel</Button>
          <Button onClick={handleCloseSettings}>OK</Button>
        </DialogActions>
      </Dialog>
      <Grid container sx={{ height: "100%" }}>
        <Grid container item xs={12}>
          <Grid item xs={3} sx={{ textAlign: "left" }}>
            <h1
              style={{
                fontFamily: "EngraversGothic",
                margin: "0",
              }}
            >
              CryptoBunny
            </h1>
          </Grid>
          <Grid item xs ref={containerRef}>
            <Box sx={{ overflow: "hidden" }}>
              {isSuccess && (
                <Slide
                  direction={slideDirection}
                  container={containerRef.current}
                  timeout={15000}
                  easing={{ enter: "linear", exit: "linear" }}
                  in={slideTrigger}
                  onEntered={() => {
                    setSlideDirection("right");
                    slideRestart();
                  }}
                  onExited={() => {
                    setSlideDirection("left");
                    slideRestart();
                  }}
                >
                  <Box>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="body1"
                        color={currencies["btc"]["color"]}
                      >
                        BTC: ${currencies["btc"]["value"]}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={currencies["eth"]["color"]}
                      >
                        ETH: ${currencies["eth"]["value"]}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={currencies["bnb"]["color"]}
                      >
                        BNB: ${currencies["bnb"]["value"]}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={currencies["sol"]["color"]}
                      >
                        SOL: ${currencies["sol"]["value"]}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={currencies["avax"]["color"]}
                      >
                        AVAX: ${currencies["avax"]["value"]}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={currencies["dot"]["color"]}
                      >
                        DOT: ${currencies["dot"]["value"]}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={currencies["matic"]["color"]}
                      >
                        MATIC: ${currencies["matic"]["value"]}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={currencies["xrp"]["color"]}
                      >
                        XRP: ${currencies["xrp"]["value"]}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={currencies["ada"]["color"]}
                      >
                        ADA: ${currencies["ada"]["value"]}
                      </Typography>
                    </Stack>
                  </Box>
                </Slide>
              )}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: "flex-end" }}
            >
              <IconButton
                onClick={() => {
                  darkModeToggle();
                }}
              >
                <BsMoonStars />
              </IconButton>
              <IconButton onClick={handleOpenSettings}>
                <SlSettings />
              </IconButton>
              <IconButton>
                <TbGasStation />
              </IconButton>
              <IconButton>
                <IoPersonOutline />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {/* <h2>Advertisements</h2> */}
        </Grid>
      </Grid>
    </div>
  );
}
