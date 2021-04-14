import { useReducer } from "react";
import { getGifts } from "services/getGifs";
import getSingleGif from "services/getSingleGif";
import GifReducer from "./gifReducer";
import { GET_GIFS_ERROR, GET_GIFS_SUCCESSFUL, GET_GIF, SET_GIF } from "./types";

const { default: GifContext } = require("./gifContext");

const GifState = ({ children }) => {
  const initialState = {
    listOfFavs: [],
    listOfGifs: [],
    gif: {},
    error: null,
    isLoading: true,
  };
  const [state, dispatch] = useReducer(GifReducer, initialState);

  const getListOfGifs = async ({ keyword, rating }) => {
    const keywordToUse = keyword
      ? keyword
      : localStorage.getItem("lastKeyword");
    try {
      const listOfGifs = await getGifts({ keyword: keywordToUse, rating });

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
  };
  const getGif = async ({ id }) => {
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
  };
  return (
    <GifContext.Provider
      value={{
        listOfGifs: state.listOfGifs,
        listOfFavs: state.listOfFavs,
        gif: state.gif,
        error: state.error,
        isLoading: state.isLoading,
        getListOfGifs,
        getGif,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export default GifState;
