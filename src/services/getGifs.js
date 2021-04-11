import { API_KEY } from "./settings";

console.log(API_KEY);

export default function getGifts({
  keyword = "panda",
  limit = 10,
  page = 0,
} = {}) {
  const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${limit}&offset=${
    page * limit
  }&rating=r&lang=en`;
  return fetch(apiURL)
    .then((data) => data.json())
    .then((res) => {
      const { data } = res;
      const gifts = data.map((gift) => {
        const { title, id, images } = gift;
        const { url } = images.original;
        return { title, id, url };
      });
      return gifts;
    });
}
