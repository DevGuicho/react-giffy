import ListOfGifs from "components/ListOfGifs";
import SearchForm from "components/SearchForm";
import Spinner from "components/Spinner";
import useGifs from "Hooks/useGifs";
import useNearScreen from "Hooks/useNearScreen";
import React, { useEffect } from "react";
import { useParams } from "react-router";

const SearchResult = () => {
  const { keyword } = useParams();
  const { page, elementRef } = useNearScreen({ keyword });
  const { listOfGifs, isLoading, isLoadingNewGifs } = useGifs({
    keyword,
    page,
  });

  useEffect(() => {
    localStorage.setItem("lastKeyword", keyword);
    window.scroll(0, 0);
  }, [keyword]);

  return (
    <main>
      <SearchForm />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ListOfGifs
            title={`Resultados para ${keyword.replace(/-/g, " ")}`}
            listOfGifs={listOfGifs}
          />
          {isLoadingNewGifs && <Spinner />}
        </>
      )}
      <div ref={elementRef}></div>
    </main>
  );
};

export default SearchResult;
