import Login from "components/Login";
import ModalPortal from "components/Modal";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user/userContext";

const Fav = ({ id }) => {
  const { isLogged, addFav, favs } = useContext(UserContext);

  const [isFav, setIsFav] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    if (!isLogged) return setShowModal(true);
    addFav({ fav: id });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setIsFav(favs.some((favId) => favId === id));
  }, [id, favs]);

  return (
    <>
      <button onClick={handleClick}>
        <span aria-label="Fav Gif" role="img">
          {isFav ? (
            <i className="fas fa-heart-broken"></i>
          ) : (
            <i className="fas fa-heart"></i>
          )}
        </span>
      </button>
      {showModal && (
        <ModalPortal handleClose={handleClose}>
          <Login handleClose={handleClose} />
        </ModalPortal>
      )}
    </>
  );
};

export default Fav;
