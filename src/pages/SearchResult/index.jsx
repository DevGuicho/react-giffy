import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import ListOfGifs from "../../components/ListOfGifs/ListOfGifs";
import Spinner from "../../components/Spinner";
import "./styles.css";
import GifContext from "context/gif/gifContext";

const SearchResult = () => {
  const [title, setTitle] = useState("");

  const [page, setPage] = useState(0);

  const { keyword } = useParams();
  const { isLoading, getListOfGifs, listOfGifs } = useContext(GifContext);

  useEffect(() => {
    if (!isLoading)
      setTitle(
        `${listOfGifs.length} Resultados para ${keyword.replace(
          "-",
          " "
        )} | Giffy`
      );
  }, [isLoading, listOfGifs, setTitle, keyword]);

  useEffect(() => {
    getListOfGifs({ keyword, rating: "r", page });
    localStorage.setItem("lastKeyword", keyword);
  }, [getListOfGifs, page, keyword]);

  const observer = useRef();
  const lastBookElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((page) => page + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);
  return (
    <>
      <Helmet>
        <title>{isLoading ? "Loading..." : title}</title>
        <meta name="description" content="Rest of your search" />
      </Helmet>
      <main className="SearchResult">
        <h2 className="search__title">
          Resultados para: {keyword.replace("-", " ")}
        </h2>
        <section className="search__dash">
          {isLoading ? <Spinner /> : <ListOfGifs gifs={listOfGifs} />}
        </section>
        <section ref={lastBookElementRef}></section>
      </main>
    </>
  );
};

export default React.memo(SearchResult);
