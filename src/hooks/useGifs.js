import { useEffect, useContext } from "react";
import GifContext from "context/gif/gifContext";

/* const INITIAL_PAGE = 0; */

function useGifs({ keyword, rating } = {}) {
  const { isLoading, listOfGifs, getListOfGifs } = useContext(GifContext);
  const keywordToUse = keyword ? keyword : localStorage.getItem("keyword");

  useEffect(() => {
    getListOfGifs({ keyword: keywordToUse, rating });
  }, [keywordToUse, rating, getListOfGifs]);

  return { isLoading, listOfGifs };
}

/* function useGifs({ keyword, rating } = { keyword: null }) {
  const [loading, setLoading] = useState(false);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const [page, setPage] = useState(INITIAL_PAGE);
  const { gifs, setGifs } = useContext(GifsContext);

  // recuperamos la keyword del localStorage
  const keywordToUse =
    keyword || localStorage.getItem("lastKeyword") || "random";

  useEffect(
    function () {
      setLoading(true);

      getGifs({ keyword: keywordToUse, rating }).then((gifs) => {
        setGifs(gifs);
        setLoading(false);
        // guardamos la keyword en el localStorage
        if (keyword) localStorage.setItem("lastKeyword", keyword || "random");
      });
    },
    [keyword, keywordToUse, rating, setGifs]
  );

  useEffect(
    function () {
      if (page === INITIAL_PAGE) return;

      setLoadingNextPage(true);

      getGifs({ keyword: keywordToUse, page, rating }).then((nextGifs) => {
        setGifs((prevGifs) => prevGifs.concat(nextGifs));
        setLoadingNextPage(false);
      });
    },
    [keywordToUse, page, rating, setGifs]
  );

  return { loading, loadingNextPage, gifs, setPage };
}
 */
export default useGifs;
