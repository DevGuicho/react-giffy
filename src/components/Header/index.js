import React, { useContext } from "react";
import { Link } from "wouter";
import UserContext from "../../context/user/userContext";
import "./styles.css";

const Header = () => {
  const { isLogged, logout } = useContext(UserContext);

  const handleClick = (e) => {
    logout();
  };

  return (
    <header className="gf-header">
      {isLogged ? (
        <button onClick={handleClick}>Logout</button>
      ) : (
        <>
          <Link className="register-btn" to="/register">
            register
          </Link>
          <Link className="login-btn" to="/login">
            Login
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
