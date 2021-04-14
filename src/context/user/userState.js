import { useReducer } from "react";
import loginService, { authService, signUp } from "services/getLogin";
import {
  SET_LOADING,
  LOGIN_SUCCESSFUL,
  LOGIN_ERROR,
  REGISTER_SUCCESSFUL,
  REGISTER_ERROR,
  LOGOUT,
  SET_USER,
} from "./types";
import UserContext from "./userContext";
import UserReducer from "./userReducer";

const UserState = ({ children }) => {
  const initialState = {
    isLoading: false,
    isLogged: false,
    user: {},
    error: null,
    token: localStorage.getItem("token"),
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const login = async ({ email, password }) => {
    try {
      dispatch({
        type: SET_LOADING,
      });

      const data = await loginService({ email, password });

      dispatch({
        type: LOGIN_SUCCESSFUL,
        payload: data,
      });
      await authenticate();
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data,
      });
    }
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  const authenticate = async () => {
    const token = localStorage.getItem("token");
    if (!token) logout();
    try {
      const { data } = await authService({ token });
      const { user } = data;

      dispatch({
        type: SET_USER,
        payload: user,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_ERROR,
        payload: error,
      });
    }
  };
  const logUp = async ({ email, password, name }) => {
    try {
      const respuesta = await signUp({ email, password, name });
      dispatch({
        type: REGISTER_SUCCESSFUL,
        payload: respuesta,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_ERROR,
        payload: error,
      });
    }
  };
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        isLogged: state.isLogged,
        favs: state.favs,
        error: state.error,
        login,
        logout,
        authenticate,
        logUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
