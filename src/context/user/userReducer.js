import {
  ADD_FAVORITE,
  LOGIN_ERROR,
  LOGIN_SUCCESSFUL,
  LOGOUT,
  LOGUP_SUCCESSFUL,
  AUTH,
  DELETE_FAVORITE,
} from "./type";

export default function userReducer(state, action) {
  switch (action.type) {
    case LOGUP_SUCCESSFUL:
    case LOGIN_SUCCESSFUL: {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        isLogged: true,
        error: null,
      };
    }
    case AUTH: {
      return {
        ...state,
        user: action.payload.user,
        favorites: action.payload.favorites,
        isLogged: true,
        error: null,
      };
    }
    case LOGIN_ERROR: {
      localStorage.removeItem("token");
      return {
        ...state,
        user: {},
        isLogged: false,
        favorites: [],
        error: action.payload,
      };
    }
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: {},
        isLogged: false,
        favorites: [],
        error: null,
      };
    case ADD_FAVORITE: {
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    }
    case DELETE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((fav) => fav.id !== action.payload),
      };
    default: {
      return state;
    }
  }
}
