import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/Auth/AuthProvider";
import App from "./App";

import "./styles/reset.css";
import "./styles/global.css";
import "./styles/map.css";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
