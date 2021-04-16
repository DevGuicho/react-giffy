import { API_KEY, API_URL } from "./settings";

function getTrendings({ keyword = "panda" } = {}) {
  const apiURL = `${API_URL}/trending/searches?api_key=${API_KEY}&limit=30&offset=0&rating=g&lang=en`;
  return fetch(apiURL)
    .then((res) => res.json())
    .then((dat) => dat.data);
}

export default getTrendings;
