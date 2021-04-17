import React from "react";
import useUser from "Hooks/useUser";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { isLogged, logout } = useUser();

  return (
    <header className="Header">
      <Link to="/" className="Header__logo">
        <h1>Giffy</h1>
        <p>Gif the life</p>
      </Link>
      <div className="Header__buttons">
        {isLogged ? (
          <button className="btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <Link className="btn" to="/login">
              Login
            </Link>
            <Link className="outline" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
