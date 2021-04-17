import { useEffect, useState } from "react";
import { getGifs } from "services/gifServices";

const useGifs = ({ keyword, limit, offset, rating }) => {
  const [listOfGifs, setListOfGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getGifs({ keyword, limit, offset, rating }).then((gifs) => {
      setListOfGifs(gifs);
      setIsLoading(false);
    });
  }, [keyword, limit, offset, rating]);

  return { isLoading, listOfGifs };
};

export default useGifs;
