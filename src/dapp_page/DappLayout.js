import "./DappLayout.css";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Prefetch } from "../app/api/Prefetch";

import Footer from "../public_page/components/Footer";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { grey } from "@mui/material/colors";

import "@fontsource/montserrat";

const defaultTheme = createTheme({
  palette: {
    grey: {
      main: grey[600],
      dark: grey[700],
    },
  },
  typography: {
    fontFamily: ["Montserrat"],
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    grey: {
      main: grey[600],
      dark: grey[700],
    },
  },
  typography: {
    fontFamily: ["Montserrat"],
  },
});

const DappLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  const darkModeToggle = () => {
    darkMode
      ? localStorage.setItem("darkModeTheme", "false")
      : localStorage.setItem("darkModeTheme", "true");

    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const storedPreference = localStorage.getItem("darkModeTheme");
    if (storedPreference) {
      setDarkMode(JSON.parse(storedPreference));
    }
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
      <CssBaseline />
      <div className="dapp-layout">
        <Prefetch />
        <Outlet context={[darkModeToggle]} />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default DappLayout;
