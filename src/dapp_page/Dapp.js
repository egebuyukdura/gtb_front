import "./Dapp.css";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

import { Grid, Card, CardContent } from "@mui/material";

import Sidebar from "./components/side/Sidebar";
import Header from "./components/side/Header";
import Console from "./components/side/Console";

import Home from "./components/main/Home";
import Ledger from "./components/main/Ledger";
import Sniper from "./components/main/Sniper";
import Presale from "./components/main/Presale";
import WalletTracker from "./components/main/WalletTracker";
import Arbitrage from "./components/main/Arbitrage";
import Send from "./components/main/Send";
import Bridge from "./components/main/Bridge";

const Dapp = () => {
  const [contentPage, setContentPage] = useState([
    { id: 1, name: "renderHome", state: true },
    { id: 2, name: "renderLedger", state: false },
    { id: 3, name: "renderSniper", state: false },
    { id: 4, name: "renderPresale", state: false },
    { id: 5, name: "renderTracker", state: false },
    { id: 6, name: "renderArbitrage", state: false },
    { id: 7, name: "renderSend", state: false },
    { id: 8, name: "renderBridge", state: false },
  ]);
  const [darkModeToggle] = useOutletContext();

  const renderContentPage = (id) => {
    let newContentPage = [];
    setContentPage((prevContentPage) => {
      newContentPage = prevContentPage.map((p) => {
        if (p.state === true) {
          return { ...p, state: false };
        } else {
          return { ...p };
        }
      });
      newContentPage = newContentPage.map((p) => {
        if (p.id === id) {
          return { ...p, state: true };
        } else {
          return { ...p };
        }
      });
      return newContentPage;
    });
  };

  return (
    <div className="dapp">
      <Grid container spacing={1} sx={{ height: "100%" }}>
        <Grid item xs={0.5}>
          <Sidebar renderContentPage={renderContentPage} />
        </Grid>
        <Grid container item spacing={2} xs={11.5}>
          <Grid item xs={12} sx={{ mr: "7.5px", mt: "3.5px" }}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent sx={{ height: "100%", paddingTop: "5px" }}>
                <Header darkModeToggle={darkModeToggle} />
              </CardContent>
            </Card>
          </Grid>
          <Grid container item spacing={2} xs={12} sx={{ mr: "7.5px" }}>
            <Grid item xs={9}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent sx={{ height: "100%" }}>
                  {contentPage[0].state && <Home />}
                  {contentPage[1].state && <Ledger />}
                  {contentPage[2].state && <Sniper />}
                  {contentPage[3].state && <Presale />}
                  {contentPage[4].state && <WalletTracker />}
                  {contentPage[5].state && <Arbitrage />}
                  {contentPage[6].state && <Send />}
                  {contentPage[7].state && <Bridge />}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent sx={{ height: "100%" }}>
                  <h2>Side Panel</h2>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mr: "7.5px" }}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent sx={{ height: "100%" }}>
                <Console />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dapp;
