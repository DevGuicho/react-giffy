import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const Header = () => {
  return (
    <header className="Header">
      <Link className="Header__logo" to="/">
        <h2>Giffy</h2>
        <p>Gif the life</p>
      </Link>
      <div className="Header__buttons">
        <Link className="btn" to="/login">
          Login
        </Link>
        <Link className="btn outline" to="/register">
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
