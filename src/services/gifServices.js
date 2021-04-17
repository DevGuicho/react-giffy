import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

export const getGifs = async ({
  keyword = "random",
  limit = "15",
  rating = "r",
  page = "0",
}) => {
  console.log({ keyword, limit, rating, page });
  const response = await axios({
    url: `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=${limit}&offset=${
      page * limit
    }&rating=${rating}`,
    method: "GET",
  });

  const { data } = response.data;
  const listOfGifs = data.map((gif) => {
    return { id: gif.id, url: gif.images.original.url, title: gif.title };
  });

  return listOfGifs;
};

export const getSingleGif = async ({ id }) => {
  const response = await axios({
    method: "GET",
    url: `https://api.giphy.com/v1/gifs/${id}?api_key=${process.env.REACT_APP_API_KEY}`,
  });
  const { data } = response.data;
  return { id: data.id, title: data.title, url: data.images.original.url };
};
