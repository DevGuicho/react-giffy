import { useEffect, useState } from "react";
import { getGifs } from "services/gifServices";

const useGifs = ({ keyword, limit, rating, page = 0 }) => {
  const [listOfGifs, setListOfGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingNewGifs, setIsLoadingNewGifs] = useState(false);

  useEffect(() => {
    if (page > 0) {
      setIsLoadingNewGifs(true);
      getGifs({ keyword, limit, page, rating }).then((gifs) => {
        setListOfGifs((list) => [...list, ...gifs]);
        setIsLoading(false);
        setIsLoadingNewGifs(false);
      });
    }
    if (page === 0) {
      getGifs({ keyword, limit, page, rating }).then((gifs) => {
        setListOfGifs((list) => [...gifs]);
        setIsLoading(false);
        setIsLoadingNewGifs(false);
      });
    }
  }, [keyword, limit, page, rating]);

  return { isLoading, listOfGifs, isLoadingNewGifs };
};

export default useGifs;
