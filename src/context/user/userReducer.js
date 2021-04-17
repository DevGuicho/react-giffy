import {
  LOGIN_ERROR,
  LOGIN_SUCCESSFUL,
  LOGOUT,
  LOGUP_SUCCESSFUL,
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
    default: {
      return state;
    }
  }
}
