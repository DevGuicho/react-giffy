import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="Header">
      <Link to="/" className="Header__logo">
        <h2>Giffy</h2>
        <p>Gif the life</p>
      </Link>
      <div className="Header__buttons">
        <Link className="btn" to="/">
          Login
        </Link>
        <Link className="outline" to="/">
          register
        </Link>
      </div>
    </header>
  );
};

export default Header;
