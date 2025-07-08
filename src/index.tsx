import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const pirateTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFD700", // gold
    },
    secondary: {
      main: "#4682B4", // steel blue
    },
    background: {
      default: "#0e1a24", // deep sea
      paper: "#1f2d3a", // dark parchment
    },
    text: {
      primary: "#fef3c7", // off-white parchment text
      secondary: "#c2b280",
    },
  },
  typography: {
    fontFamily: `'Pirata One', 'Roboto', sans-serif`,
    h4: {
      fontWeight: 700,
      textTransform: "uppercase",
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          border: "1px solid #FFD700",
          boxShadow: "0 0 10px rgba(255, 215, 0, 0.2)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          textTransform: "uppercase",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ThemeProvider theme={pirateTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
