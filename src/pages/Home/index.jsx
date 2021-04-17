import ListOfGifs from "components/ListOfGifs";
import ListOfTrendings from "components/ListOfTrendings";
import SearchForm from "components/SearchForm";
import Spinner from "components/Spinner";
import useGifs from "Hooks/useGifs";
import React from "react";

const Home = () => {
  const keyword = localStorage.getItem("lastKeyword");
  const { isLoading, listOfGifs } = useGifs({ keyword });

  return (
    <main className="Home">
      <SearchForm />
      {isLoading ? (
        <Spinner />
      ) : (
        <ListOfGifs title="Última Búsqueda" listOfGifs={listOfGifs} />
      )}
      <ListOfTrendings />
    </main>
  );
};

export default Home;
