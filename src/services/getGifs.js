import { API_KEY } from "./settings";

export function getGifts({
  keyword = "random",
  limit = 10,
  page = 0,
  rating = "r",
}) {
  const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.replace(
    "-",
    ""
  )}&limit=${limit}&offset=${page * limit}&rating=${rating}&lang=en`;
  return fetch(apiURL)
    .then((data) => data.json())
    .then((res) => {
      const { data } = res;
      const gifs = data.map((gift) => {
        const { title, id, images } = gift;
        const { url } = images.original;
        return { title, id, url };
      });
      return gifs;
    });
}
