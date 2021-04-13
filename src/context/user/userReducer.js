import {
  ADD_FAV,
  AUTH,
  SET_ERROR,
  SET_LOADING,
  SET_LOGIN,
  SET_LOGOUT,
} from "./types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AUTH:
      return {
        ...state,
        user: action.payload,
        jwt: localStorage.getItem("token", action.payload.token),
        loading: false,
        isLogged: true,
        favs: action.payload.favorites.map((fav) => fav.url),
      };
    case SET_LOGIN:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        jwt: action.payload.token,
        loading: false,
        isLogged: true,
      };
    case SET_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        error: action.payload,
        isLogged: false,
        loading: false,
        jwt: "",
        favs: [],
        user: {},
      };
    case SET_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isLogged: false,
        jwt: "",
        favs: [],
        user: {},
      };
    case ADD_FAV:
      return {
        ...state,
        favs: [...state.favs, action.payload],
      };
    default:
      return state;
  }
};
