import React from "react";
import ReactDOM from "react-dom";
import "assets/styles/index.css";
import "assets/styles/normalize.css";
import App from "routes/App";
import UserState from "./context/user/userState";
import GifState from "context/gif/gifState";

ReactDOM.render(
  <React.StrictMode>
    <UserState>
      <GifState>
        <App />
      </GifState>
    </UserState>
  </React.StrictMode>,
  document.getElementById("root")
);
