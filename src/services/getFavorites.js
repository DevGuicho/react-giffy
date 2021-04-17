import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
export const getFavoritesService = async ({ token, userId }) => {
  const response = await axios({
    url: `${apiUrl}/api/favorites/${userId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
export const addFavoriteService = async ({ url, gifId, token, userId }) => {
  const response = await axios({
    url: `${apiUrl}/api/favorites`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      url,
      gifId,
      user: userId,
    },
  });
  return response.data.data;
};

export const deleteFavoriteService = async ({ token, id }) => {
  const res = await axios({
    method: "DELETE",
    url: `${apiUrl}/api/favorites/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
