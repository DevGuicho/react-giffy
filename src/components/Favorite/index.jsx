import useFavorites from "Hooks/useFavorites";
import React from "react";

const Favorite = ({ gifId, url }) => {
  const { favorite, addFavorite, deleteFavorite, setFavorite } = useFavorites({
    gifId,
  });

  const handleClick = () => {
    addFavorite({ gifId, url }).then((fav) => setFavorite(fav));
  };
  const handleDeleteFav = () => {
    deleteFavorite({ id: favorite.id });
  };
  if (favorite)
    return (
      <button onClick={handleDeleteFav}>
        <i className="fas fa-heart-broken"></i>
      </button>
    );
  return (
    <button onClick={handleClick}>
      <i className="fas fa-heart"></i>
    </button>
  );
};

export default Favorite;
