import React, { useContext, useEffect } from "react";

import ListOfGifs from "../../components/ListOfGifs/ListOfGifs";
import Spinner from "../../components/Spinner";
import TrendigSearches from "../../components/TrendigsSearches";
import "./styles.css";
import { Helmet } from "react-helmet";
import GifContext from "context/gif/gifContext";

const Home = () => {
  const { listOfGifs, isLoading, getListOfGifs } = useContext(GifContext);

  useEffect(() => {
    getListOfGifs({ rating: "r" });
  }, [getListOfGifs]);

  return (
    <>
      <Helmet>
        <title>Home | Giffy</title>
        <meta name="description" content="Busca tus gifs favoritos" />
      </Helmet>
      <main className="Home">
        <h2>Última Búsqueda</h2>
        {isLoading ? <Spinner /> : <ListOfGifs gifs={listOfGifs} />}
        <TrendigSearches />
      </main>
    </>
  );
};

export default Home;
