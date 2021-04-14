import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Gif from "../../components/Gif";
import Spinner from "../../components/Spinner";
import { Helmet } from "react-helmet";
import "./styles.css";
import GifContext from "context/gif/gifContext";

const Detail = () => {
  const { id } = useParams();
  const { gif, getGif, isLoading } = useContext(GifContext);
  const { title, id: gifId, url } = gif;

  useEffect(() => {
    getGif({ id });
  }, []);

  return (
    <>
      <Helmet>
        <title>{isLoading ? "Cargando..." : `${title} | Giffy`}</title>
      </Helmet>
      <div className="detail">
        <div className="detail-container">
          {isLoading ? (
            <Spinner />
          ) : (
            <Gif id={gifId} title={title} url={url} detail />
          )}
        </div>
      </div>
    </>
  );
};

export default Detail;
