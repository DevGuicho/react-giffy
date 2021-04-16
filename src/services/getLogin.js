import axios from "axios";
const ENDPOINT = process.env.REACT_APP_API_URL;

const loginService = ({ password, email }) => {
  return axios({
    url: `${ENDPOINT}/api/auth/sign-in`,
    method: "POST",
    auth: {
      username: email,
      password,
    },
  }).then((res) => {
    if (!res.data) throw new Error("Response is not ok");

    return res.data.data;
  });
};

export const authService = async ({ token }) => {
  try {
    const res = await axios({
      url: `${ENDPOINT}/api/auth`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const addFavService = async ({ token, favorite, userId }) => {
  try {
    const res = await axios({
      url: `${ENDPOINT}/api/favorites`,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        url: favorite,
        user: userId,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const signUp = async ({ email, password, name }) => {
  const res = await axios({
    url: `${ENDPOINT}/api/auth/sign-up`,
    method: "post",
    data: {
      email,
      password,
      name,
    },
  });
  return res;
};

export default loginService;
