import "./Sidebar.css";

import { Drawer, Box, IconButton, Divider, Stack, Button } from "@mui/material";

import { useState } from "react";

import {
  MdTrackChanges,
  MdHome,
  MdLibraryBooks,
  MdSwapCalls,
} from "react-icons/md";
import { FaCrosshairs, FaRegPaperPlane } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";
import { TfiArrowsHorizontal } from "react-icons/tfi";
import { AiOutlineMenu } from "react-icons/ai";

export default function Sidebar({ renderContentPage }) {
  const [sidebarTrigger, setSidebarTrigger] = useState(false);

  return (
    <div
      className="sidebar"
      style={{
        height: "100%",
        justifyItems: "center",
      }}
    >
      <IconButton
        onMouseOver={() => setSidebarTrigger(true)}
        sx={{ marginBottom: "3px" }}
      >
        <AiOutlineMenu />
      </IconButton>
      <Divider />
      <Box
        onMouseOver={() => setSidebarTrigger(true)}
        sx={{ marginTop: "3px" }}
      >
        <Stack direction="column" spacing={2}>
          <IconButton>
            <MdHome />
          </IconButton>
          <IconButton>
            <MdLibraryBooks />
          </IconButton>
          <IconButton>
            <FaCrosshairs />
          </IconButton>
          <IconButton>
            <IoRocketOutline />
          </IconButton>
          <IconButton>
            <MdTrackChanges />
          </IconButton>
          <IconButton>
            <MdSwapCalls />
          </IconButton>
          <IconButton>
            <FaRegPaperPlane />
          </IconButton>
          <IconButton>
            <TfiArrowsHorizontal />
          </IconButton>
        </Stack>
      </Box>

      <Drawer anchor="left" open={sidebarTrigger}>
        <Box
          p={2}
          textAlign="center"
          height="100%"
          onMouseLeave={() => setSidebarTrigger(false)}
        >
          <h1
            style={{
              fontFamily: "EngraversGothic",
              margin: "0",
              marginBottom: "3px",
            }}
          >
            CryptoBunny
          </h1>
          <Divider />
          <Stack direction="column" spacing={2.5} sx={{ marginTop: "3px" }}>
            <Button
              variant="text"
              color="grey"
              startIcon={<MdHome />}
              onClick={() => {
                renderContentPage(1);
              }}
              sx={{ fontFamily: "Quicksand" }}
            >
              Home
            </Button>
            <Button
              variant="text"
              color="grey"
              startIcon={<MdLibraryBooks />}
              onClick={() => {
                renderContentPage(2);
              }}
              sx={{ fontFamily: "Quicksand" }}
            >
              Ledger
            </Button>
            <Button
              variant="text"
              color="grey"
              startIcon={<FaCrosshairs />}
              onClick={() => {
                renderContentPage(3);
              }}
              sx={{ fontFamily: "Quicksand" }}
            >
              Sniper
            </Button>
            <Button
              variant="text"
              color="grey"
              startIcon={<IoRocketOutline />}
              onClick={() => {
                renderContentPage(4);
              }}
              sx={{ fontFamily: "Quicksand" }}
            >
              Presale
            </Button>
            <Button
              variant="text"
              color="grey"
              startIcon={<MdTrackChanges />}
              onClick={() => {
                renderContentPage(5);
              }}
              sx={{ fontFamily: "Quicksand" }}
            >
              Wallet Tracker
            </Button>
            <Button
              variant="text"
              color="grey"
              startIcon={<MdSwapCalls />}
              onClick={() => {
                renderContentPage(6);
              }}
              sx={{ fontFamily: "Quicksand" }}
            >
              Arbitrage
            </Button>
            <Button
              variant="text"
              color="grey"
              startIcon={<FaRegPaperPlane />}
              onClick={() => {
                renderContentPage(7);
              }}
              sx={{ fontFamily: "Quicksand" }}
            >
              Send
            </Button>
            <Button
              variant="text"
              color="grey"
              startIcon={<TfiArrowsHorizontal />}
              onClick={() => {
                renderContentPage(8);
              }}
              sx={{ fontFamily: "Quicksand" }}
            >
              Bridge
            </Button>
          </Stack>
        </Box>
      </Drawer>
      {/*
      <AiOutlineMenu /> <button
        onClick={() => {
          renderContentPage(1);
        }}
      >
        <MdHome />
        Home
      </button>
      <button
        onClick={() => {
          renderContentPage(2);
        }}
      >
        <MdLibraryBooks />
        Ledger
      </button>
      <button
        onClick={() => {
          renderContentPage(3);
        }}
      >
        <FaCrosshairs />
        Sniper
      </button>
      <button
        onClick={() => {
          renderContentPage(4);
        }}
      >
        <IoRocketOutline />
        Presale
      </button>
      <button
        onClick={() => {
          renderContentPage(5);
        }}
      >
        <MdTrackChanges />
        Wallet Tracker
      </button>
      <button
        onClick={() => {
          renderContentPage(6);
        }}
      >
        <MdSwapCalls />
        Arbitrage
      </button>
      <button
        onClick={() => {
          renderContentPage(7);
        }}
      >
        <FaRegPaperPlane />
        Send
      </button>
      <button
        onClick={() => {
          renderContentPage(8);
        }}
      >
        <TfiArrowsHorizontal />
        Bridge
      </button> */}
    </div>
  );
}
