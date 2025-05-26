import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Router>
        <Toaster />
        <Box
          style={{
            height: "100vh",
          }}
        >
          <App />
        </Box>
      </Router>
    </React.StrictMode>
  );
}
