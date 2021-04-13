import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "wouter";
import UserContext from "../../context/user/userContext";

const Fav = ({ id }) => {
  const { isLogged, addFav, favs } = useContext(UserContext);
  const [, navigate] = useLocation();
  const [isFav, setIsFav] = useState(false);
  const handleClick = (e) => {
    if (!isLogged) return navigate("/login");
    addFav({ fav: id });
  };
  useEffect(() => {
    setIsFav(favs.some((favId) => favId === id));
  }, [id, favs]);

  return (
    <button onClick={handleClick}>
      <span aria-label="Fav Gif" role="img">
        {isFav ? (
          <i className="fas fa-heart-broken"></i>
        ) : (
          <i className="fas fa-heart"></i>
        )}
      </span>
    </button>
  );
};

export default Fav;
