import { useCallback, useReducer } from "react";
import loginService, {
  addFavService,
  authService,
  signUp,
} from "services/getLogin";
import {
  SET_LOADING,
  LOGIN_SUCCESSFUL,
  LOGIN_ERROR,
  REGISTER_SUCCESSFUL,
  REGISTER_ERROR,
  LOGOUT,
  SET_USER,
  ADD_FAVORITE,
} from "./types";
import UserContext from "./userContext";
import UserReducer from "./userReducer";

const UserState = ({ children }) => {
  const initialState = {
    isLoading: false,
    isLogged: false,
    user: { favorites: [] },
    error: null,
    token: localStorage.getItem("token"),
    favorites: [],
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

  const logout = useCallback(() => {
    dispatch({
      type: LOGOUT,
    });
  }, []);

  const authenticate = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
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
  }, []);
  const logUp = async ({ email, password, name }) => {
    try {
      const respuesta = await signUp({ email, password, name });

      dispatch({
        type: REGISTER_SUCCESSFUL,
        payload: respuesta.data.data,
      });
      await authenticate();
    } catch (error) {
      dispatch({
        type: REGISTER_ERROR,
        payload: error,
      });
    }
  };
  const addFavorite = useCallback(
    async ({ favorite }) => {
      try {
        await addFavService({
          token: state.token,
          favorite,
          userId: state.user.id,
        });
        dispatch({
          type: ADD_FAVORITE,
          payload: favorite,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [state.token, state.user]
  );
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        isLogged: state.isLogged,
        error: state.error,
        favorites: state.favorites,
        login,
        logout,
        authenticate,
        logUp,
        addFavorite,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
