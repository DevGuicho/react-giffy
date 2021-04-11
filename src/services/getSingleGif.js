import { API_KEY, API_URL } from "./settings";

const fromApiResponseToGifs = (apiRespose) => {
  const { data } = apiRespose;
  const { images, title, id } = data;
  const { original } = images;
  const { url } = original;
  return { title, id, url };
};

function getSingleGif({ id }) {
  const apiURL = `${API_URL}/gifs/${id}?api_key=${API_KEY}`;
  return fetch(apiURL)
    .then((res) => res.json())
    .then((dat) => fromApiResponseToGifs(dat));
}

export default getSingleGif;
