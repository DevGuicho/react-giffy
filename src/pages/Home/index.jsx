import React from "react";

import ListOfGifs from "../../components/ListOfGifs/ListOfGifs";
import SearchForm from "../../components/SearchForm";
import Spinner from "../../components/Spinner";
import TrendigSearches from "../../components/TrendigsSearches";
import useGifs from "../../hooks/useGifs";
import "./styles.css";
import { Helmet } from "react-helmet";

const Home = () => {
  const { loading, gifs } = useGifs();

  return (
    <>
      <Helmet>
        <title>Home | Giffy</title>
        <meta name="description" content="Busca tus gifs favoritos" />
      </Helmet>
      <div className="Home">
        <SearchForm />

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
