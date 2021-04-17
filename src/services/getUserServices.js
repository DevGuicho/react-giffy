import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
export const authenticateService = async ({ token }) => {
  const res = await axios({
    url: `${apiUrl}/api/auth`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { user } = res.data;
  const { favorites } = user;
  return { user, favorites };
};
