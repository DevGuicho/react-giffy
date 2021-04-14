import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import ListOfGifs from "../../components/ListOfGifs/ListOfGifs";
import Spinner from "../../components/Spinner";
import "./styles.css";
import GifContext from "context/gif/gifContext";

const SearchResult = () => {
  const [title, setTitle] = useState("");
  const { keyword } = useParams();
  const { isLoading, getListOfGifs, listOfGifs } = useContext(GifContext);

  useEffect(() => {
    getListOfGifs({ keyword, rating: "r" });
  }, []);

  useEffect(() => {
    if (!isLoading)
      setTitle(
        `${listOfGifs.length} Resultados para ${keyword.replace(
          "-",
          " "
        )} | Giffy`
      );
  }, [isLoading, listOfGifs, setTitle, keyword]);
  return (
    <>
      <Helmet>
        <title>{isLoading ? "Loading..." : title}</title>
        <meta name="description" content="Rest of your search" />
      </Helmet>
      <main>
        <h2 className="search__title">
          Resultados para: {keyword.replace("-", " ")}
        </h2>
        {isLoading ? <Spinner /> : <ListOfGifs gifs={listOfGifs} />}
      </main>
    </>
  );
};

export default React.memo(SearchResult);
