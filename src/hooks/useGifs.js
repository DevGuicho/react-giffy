import { useState, useEffect, useContext } from "react";
import GifsContext from "../context/GifsContext";
import getGifs from "../services/getGifs";

const INITIAL_PAGE = 0;

function useGifs({ keyword, rating } = { keyword: null }) {
  const [loading, setLoading] = useState(true);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);

  const { gifs, setGifs } = useContext(GifsContext);

  const keywordToUse =
    keyword || localStorage.getItem("lastKeyword") || "random";

  useEffect(() => {
    getGifs({ keyword: keywordToUse, rating }).then((gifs) => {
      setGifs(gifs);
      setLoading(false);
      localStorage.setItem("lastKeyword", keywordToUse);
    });
  }, [keywordToUse, setGifs, rating]);

  useEffect(() => {
    if (page === INITIAL_PAGE) return;
    setLoadingNextPage(true);
    getGifs({ keyword: keywordToUse, page, rating }).then((nextGif) => {
      setGifs((prevGifs) => prevGifs.concat(nextGif));
      setLoadingNextPage(false);
    });
  }, [keywordToUse, page, setGifs, rating]);

  return { gifs, loading, setPage, loadingNextPage };
}

export default useGifs;
