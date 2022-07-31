import React, { createContext, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.css";

// export const UserContext = createContext();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
