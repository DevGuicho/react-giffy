import React from "react";
import ReactDOM from "react-dom";
import "assets/styles/index.css";
import "assets/styles/normalize.css";
import App from "routes/App";
import UserState from "context/user/userState";

ReactDOM.render(
  <React.StrictMode>
    <UserState>
      <App />
    </UserState>
  </React.StrictMode>,
  document.getElementById("root")
);
