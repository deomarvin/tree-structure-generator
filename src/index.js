import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
let colorMode = "light";
const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          // background: " rgba(0,0,0,0.6)",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: { "--DataGrid-overlayHeight": "200px" },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "8px !important",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
  palette: {
    mode: colorMode,
    primary: {
      main: colorMode === "light" ? "#00408C" : "#486581",
      contrastText: "#fff",
    },
    secondary: {
      main: "#b72f22",
    },
    background: {
      default: colorMode === "light" ? "#e0e0e0" : "#000",
      // paper: "#7b5227",
      // paper: "#fff",
    },
    text: {
      // primary: "#000",
    },
  },
  typography: {
    fontFamily: ['"Roboto"'].join(","),
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
