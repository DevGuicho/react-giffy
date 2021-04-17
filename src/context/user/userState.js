import { useCallback, useReducer } from "react";
import userReducer from "./userReducer";
import UserContext from "./userContext";
import axios from "axios";
import {
  LOGIN_SUCCESSFUL,
  LOGIN_ERROR,
  LOGOUT,
  LOGUP_SUCCESSFUL,
  ADD_FAVORITE,
  GET_FAVORITES,
  AUTH,
  DELETE_FAVORITE,
} from "./type";
import {
  addFavoriteService,
  deleteFavoriteService,
  getFavoritesService,
} from "services/getFavorites";
import { authenticateService } from "services/getUserServices";

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

  const getFavorites = useCallback(async () => {
    try {
      const favorites = await getFavoritesService({
        userId: state.user.id,
        token: localStorage.getItem("token"),
      });
      dispatch({
        type: GET_FAVORITES,
        payload: favorites,
      });
    } catch (error) {}
  }, [state.user.id]);

  const addFavorite = useCallback(
    async ({ gifId }) => {
      try {
        const favorite = await addFavoriteService({
          token: localStorage.getItem("token"),
          userId: state.user.id,
          gifId,
        });
        dispatch({
          type: ADD_FAVORITE,
          payload: favorite,
        });
        return favorite;
      } catch (error) {
        console.log(error);
      }
    },
    [state.user.id]
  );
  const deleteFavorite = useCallback(async ({ id }) => {
    const token = localStorage.getItem("token");
    try {
      await deleteFavoriteService({ id, token });
      dispatch({
        type: DELETE_FAVORITE,
        payload: id,
      });
    } catch (error) {}
  }, []);

  const authenticate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await authenticateService({ token });
      dispatch({
        type: AUTH,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: LOGOUT,
      });
    }
  };
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
        addFavorite,
        getFavorites,
        deleteFavorite,
        authenticate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
