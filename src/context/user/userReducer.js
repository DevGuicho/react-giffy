import {
  SET_LOADING,
  LOGOUT,
  SET_USER,
  LOGIN_SUCCESSFUL,
  REGISTER_SUCCESSFUL,
  LOGIN_ERROR,
  REGISTER_ERROR,
  ADD_FAVORITE,
} from "./types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESSFUL:
    case LOGIN_SUCCESSFUL:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        isLogged: true,
        isLoading: false,
        error: null,
      };
    case SET_USER:
      return {
        ...state,
        isLogged: true,
        isLoading: false,
        user: action.payload,
        favorites: action.payload.favorites.map((fav) => fav.url),
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_ERROR:
    case REGISTER_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        error: action.payload,
        isLogged: false,
        loading: false,
        user: {},
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isLogged: false,
        isLoading: false,
        jwt: null,
        user: {},
        error: null,
        favorites: [],
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};
