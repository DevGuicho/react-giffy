import { useCallback, useReducer } from "react";
import userReducer from "./userReducer";
import UserContext from "./userContext";
import axios from "axios";
import {
  LOGIN_SUCCESSFUL,
  LOGIN_ERROR,
  LOGOUT,
  LOGUP_SUCCESSFUL,
} from "./type";

const UserState = ({ children }) => {
  const initialState = {
    user: {},
    favorites: [],
    isLogged: false,
    error: null,
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = useCallback(async ({ email, password }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/api/auth/sign-in`,
        auth: {
          username: email,
          password,
        },
      });

      dispatch({
        type: LOGIN_SUCCESSFUL,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: "Correo o Contraseña invalida",
      });
    }
  }, []);

  const logUp = async ({ name, email, password }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/api/auth/sign-up`,
        data: {
          name,
          email,
          password,
        },
      });
      const { id, token } = response.data.data;
      dispatch({
        type: LOGUP_SUCCESSFUL,
        payload: {
          user: {
            name,
            email,
            id,
          },
          token,
        },
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: "El correo ya ha sido registrado",
      });
    }
  };
  const logout = useCallback(() => {
    dispatch({
      type: LOGOUT,
    });
  }, []);
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        favorites: state.favorites,
        isLogged: state.isLogged,
        error: state.error,
        login,
        logout,
        logUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
