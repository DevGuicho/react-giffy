import UserContext from "context/user/userContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const Header = () => {
  const { isLogged, user, logout } = useContext(UserContext);

  return (
    <header className="Header">
      <Link className="Header__logo" to="/">
        <h2>Giffy</h2>
        <p>Gif the life</p>
      </Link>
      <div className="Header__buttons">
        {!isLogged ? (
          <>
            <Link className="btn" to="/login">
              Login
            </Link>
            <Link className="btn outline" to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <p>{user.name}</p>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default React.memo(Header);
