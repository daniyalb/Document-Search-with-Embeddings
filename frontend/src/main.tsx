import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
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
