import React, { useCallback, useEffect, useRef } from "react";
import ListOfGifs from "../../components/ListOfGifs/ListOfGifs";
import Spinner from "../../components/Spinner";
import "./styles.css";
import useGifs from "../../hooks/useGifs";
import useNearScreen from "../../hooks/useNearScreen";
import debounce from "just-debounce-it";
import useTitle from "../../hooks/useSEO";
import { Helmet } from "react-helmet";
import SearchForm from "../../components/SearchForm";

const SearchResult = ({ params }) => {
  const { keyword, rating = "r" } = params;

  const { loading, gifs, setPage } = useGifs({ keyword, rating });
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false,
  });

  const title = gifs ? `${gifs.length} Resultados de ${keyword}` : "";
  useTitle({ title });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandleNextPage = useCallback(
    debounce(() => setPage((prevPage) => prevPage + 1), 1000),
    []
  );

  useEffect(() => {
    if (isNearScreen) debounceHandleNextPage();
  }, [debounceHandleNextPage, isNearScreen]);
  return (
    <>
      <Helmet>
        <title>{title} | Giffy</title>
      </Helmet>
      {loading ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="center">
            <SearchForm
              initialKeyword={params.keyword.replace("-", " ")}
              initialRating={params.rating}
            />
          </div>
          <h3 className="search__title">
            Resultados para: {keyword.replace("-", " ")}
          </h3>
          <ListOfGifs gifs={gifs} />
          <div id="visor" ref={externalRef}></div>
        </div>
      )}
    </>
  );
};

export default React.memo(SearchResult);
