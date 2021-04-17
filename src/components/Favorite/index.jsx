import React, { useState } from "react";
import Login from "components/Login";
import ModalPortal from "components/Modal";
import useFavorites from "Hooks/useFavorites";
import useUser from "Hooks/useUser";
import "./Favorite.css";

const Favorite = ({ gifId, url }) => {
  const [showModal, setShowModal] = useState(false);
  const { favorite, addFavorite, deleteFavorite, setFavorite } = useFavorites({
    gifId,
  });
  const { isLogged } = useUser();

  const handleClose = () => {
    setShowModal(false);
  };
  const handleClick = () => {
    if (!isLogged) return setShowModal(true);

    if (favorite) {
      deleteFavorite({ id: favorite.id });
    } else {
      addFavorite({ gifId, url }).then((fav) => setFavorite(fav));
    }
  };

  return (
    <>
      <button className="Favorite" onClick={handleClick}>
        <span aria-label="Fav Gif" role="img">
          {favorite ? (
            <i className="fas fa-heart-broken"></i>
          ) : (
            <i className="fas fa-heart"></i>
          )}
        </span>
      </button>
      {showModal && (
        <ModalPortal handleClose={handleClose}>
          {<Login handleClose={handleClose} />}
        </ModalPortal>
      )}
    </>
  );
};

export default Favorite;
