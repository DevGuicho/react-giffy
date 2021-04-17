import Gif from "components/Gif";
import Spinner from "components/Spinner";
import useSingleGif from "Hooks/useSingleGif";
import React from "react";
import { useParams } from "react-router";

const GifDetail = () => {
  const { id } = useParams();
  const { isLoading, gif } = useSingleGif({ id });

  return (
    <main className="GifDetail">
      {isLoading ? (
        <Spinner />
      ) : (
        <Gif title={gif.title} id={gif.id} url={gif.url} />
      )}
    </main>
  );
};

export default GifDetail;
