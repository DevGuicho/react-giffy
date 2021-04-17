import UserContext from "context/user/userContext";
import { useContext, useEffect, useState } from "react";

const useFavorites = ({ gifId } = {}) => {
  const [favorite, setFavorite] = useState(null);

  const {
    addFavorite,
    favorites,
    getFavorites,
    isLogged,
    deleteFavorite,
  } = useContext(UserContext);

  useEffect(() => {
    if (gifId) setFavorite(favorites.find((fav) => fav.gifId === gifId));
  }, [gifId, favorites]);

  useEffect(() => {
    if (!gifId && isLogged && favorites.length === 0) getFavorites();
  }, [gifId, getFavorites, isLogged, favorites]);

  return {
    favorites,
    addFavorite,
    getFavorites,
    favorite,
    setFavorite,
    deleteFavorite,
  };
};

export default useFavorites;
