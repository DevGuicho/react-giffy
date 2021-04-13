import { useReducer } from "react";
import loginService, {
  addFavService,
  authService,
} from "../../services/getLogin";
import {
  ADD_FAV,
  AUTH,
  SET_ERROR,
  SET_LOADING,
  SET_LOGIN,
  SET_LOGOUT,
} from "./types";
import UserContext from "./userContext";
import UserReducer from "./userReducer";

const UserState = ({ children }) => {
  const initialState = {
    loading: false,
    error: null,
    jwt: localStorage.getItem("token") || "",
    favs: [],
    isLogged: false,
    user: {},
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const login = async ({ email, password }) => {
    try {
      dispatch({
        type: SET_LOADING,
      });

      const data = await loginService({ email, password });

      dispatch({
        type: SET_LOGIN,
        payload: data,
      });
      await authenticate();
    } catch (error) {
      console.log("entre");
      dispatch({
        type: SET_ERROR,
        payload: error.response.data,
      });
    }
  };

  const logout = () => {
    dispatch({
      type: SET_LOGOUT,
    });
  };

  const addFav = async ({ fav }) => {
    try {
      await addFavService({
        token: state.jwt,
        fav,
        userId: state.user.id,
      });
      dispatch({
        type: ADD_FAV,
        payload: fav,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const authenticate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const { data } = await authService({ token });
      const { user } = data;

      dispatch({
        type: AUTH,
        payload: user,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SET_ERROR,
        payload: error,
      });
    }
  };
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        jwt: state.jwt,
        loading: state.loading,
        isLogged: state.isLogged,
        favs: state.favs,
        login,
        logout,
        addFav,
        authenticate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
