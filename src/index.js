import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserState from "./context/user/userState";

ReactDOM.render(
  <React.StrictMode>
    <UserState>
      <App />
    </UserState>
  </React.StrictMode>,
  document.getElementById("root")
);
