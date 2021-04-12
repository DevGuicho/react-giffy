import React, { useCallback } from "react";
import { useLocation } from "wouter";
import ListOfGifs from "../../components/ListOfGifs/ListOfGifs";
import SearchForm from "../../components/SearchForm";
import Spinner from "../../components/Spinner";
import TrendigSearches from "../../components/TrendigsSearches";
import useGifs from "../../hooks/useGifs";
import "./styles.css";
import { Helmet } from "react-helmet";

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [path, pushLocation] = useLocation();

  const { loading, gifs } = useGifs();
  const handleSubmit = useCallback(
    ({ keyword }) => {
      pushLocation(`/search/${keyword.replace(" ", "-")}`);
    },
    [pushLocation]
  );

  return (
    <>
      <Helmet>
        <title>Home | Giffy</title>
        <meta name="description" content="Busca tus gifs favoritos" />
      </Helmet>
      <div className="Home">
        <SearchForm onSubmit={handleSubmit} />

        <h2>Última Búsqueda</h2>
        {loading ? (
          <div className="spinner">
            <Spinner />
          </div>
        ) : (
          <ListOfGifs gifs={gifs} />
        )}
        <TrendigSearches />
      </div>
    </>
  );
};

export default Home;
