import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppWrapper from "./App.tsx"; // Make sure this is the correct import
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AppWrapper />
    </Router>
  </React.StrictMode>
);
