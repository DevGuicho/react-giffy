import { useState, useEffect, useContext } from "react";
import GifsContext from "../context/GifsContext";
import getGifs from "../services/getGifs";

const INITIAL_PAGE = 0;

function useGifs({ keyword } = { keyword: null }) {
  const [loading, setLoading] = useState(true);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);
  const { gifs, setGifs } = useContext(GifsContext);
  const keywordToUse =
    keyword || localStorage.getItem("lastKeyword") || "random";

  useEffect(() => {
    getGifs({ keyword: keywordToUse }).then((gifs) => {
      setGifs(gifs);
      setLoading(false);
      localStorage.setItem("lastKeyword", keywordToUse);
    });
  }, [keywordToUse, setGifs]);

  useEffect(() => {
    if (page === INITIAL_PAGE) return;
    setLoadingNextPage(true);
    getGifs({ keyword: keywordToUse, page }).then((nextGif) => {
      setGifs((prevGifs) => prevGifs.concat(nextGif));
      setLoadingNextPage(false);
    });
  }, [keywordToUse, page, setGifs]);

  return { gifs, loading, setPage, loadingNextPage };
}

export default useGifs;
