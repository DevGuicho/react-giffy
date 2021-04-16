import {
  ADD_GIFS_SUCCESFULL,
  GET_GIF,
  GET_GIFS_SUCCESSFUL,
  SET_GIF,
  SET_LOADING,
} from "./types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_GIFS_SUCCESFULL:
      return {
        ...state,
        listOfGifs: [...state.listOfGifs, ...action.payload],
        isLoading: false,
      };
    case GET_GIF:
      return {
        ...state,
        gif: state.listOfGifs.filter((gif) => gif.id === action.payload)[0],
        isLoading: false,
      };
    case SET_GIF:
      return {
        ...state,
        gif: action.payload,
        isLoading: false,
      };
    case GET_GIFS_SUCCESSFUL:
      return {
        ...state,
        listOfGifs: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
