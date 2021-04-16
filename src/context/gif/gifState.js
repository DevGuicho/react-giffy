import { useCallback, useReducer } from "react";
import { getGifts } from "services/getGifs";
import getSingleGif from "services/getSingleGif";
import GifReducer from "./gifReducer";
import {
  GET_GIFS_ERROR,
  GET_GIFS_SUCCESSFUL,
  GET_GIF,
  SET_GIF,
  ADD_GIFS_SUCCESFULL,
  SET_LOADING,
} from "./types";

import GifContext from "./gifContext";

const GifState = ({ children }) => {
  const initialState = {
    listOfFavs: [],
    listOfGifs: [],
    gif: {},
    error: null,
    isLoading: false,
  };
  const [state, dispatch] = useReducer(GifReducer, initialState);

  const getListOfGifs = useCallback(async ({ keyword, rating, page }) => {
    if (!page)
      dispatch({
        type: SET_LOADING,
      });
    const keywordToUse = keyword
      ? keyword
      : localStorage.getItem("lastKeyword");
    try {
      const listOfGifs = await getGifts({
        keyword: keywordToUse,
        rating,
        page,
      });
      if (page)
        dispatch({
          type: ADD_GIFS_SUCCESFULL,
          payload: listOfGifs,
        });
      else
        dispatch({
          type: GET_GIFS_SUCCESSFUL,
          payload: listOfGifs,
        });
    } catch (error) {
      dispatch({
        type: GET_GIFS_ERROR,
        payload: error,
      });
    }
  }, []);
  const getGif = useCallback(
    async ({ id }) => {
      if (state.listOfGifs.length > 0)
        dispatch({
          type: GET_GIF,
          payload: id,
        });
      else {
        const gif = await getSingleGif({ id });
        dispatch({
          type: SET_GIF,
          payload: gif,
        });
      }
    },
    [state.listOfGifs.length]
  );

  return (
    <GifContext.Provider
      value={{
        listOfGifs: state.listOfGifs,
        listOfFavs: state.listOfFavs,
        gif: state.gif,
        error: state.error,
        isLoading: state.isLoading,
        favorites: state.favorites,
        getListOfGifs,
        getGif,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export default GifState;
