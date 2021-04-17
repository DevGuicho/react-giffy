import ListOfGifs from "components/ListOfGifs";
import SearchForm from "components/SearchForm";
import Spinner from "components/Spinner";
import useGifs from "Hooks/useGifs";
import React, { useEffect } from "react";
import { useParams } from "react-router";

const SearchResult = () => {
  const { keyword } = useParams();
  const { listOfGifs, isLoading } = useGifs({ keyword });
  useEffect(() => {
    localStorage.setItem("lastKeyword", keyword);
  }, [keyword]);
  return (
    <main>
      <SearchForm />
      {isLoading ? (
        <Spinner />
      ) : (
        <ListOfGifs
          title={`Resultados para ${keyword.replace(/-/g, " ")}`}
          listOfGifs={listOfGifs}
        />
      )}
    </main>
  );
};

export default SearchResult;
