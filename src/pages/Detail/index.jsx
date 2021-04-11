import React from "react";
import { Redirect } from "wouter";
import Gif from "../../components/Gif";
import Spinner from "../../components/Spinner";
import useSingleGif from "../../hooks/useSingleGif";
import "./styles.css";

const Detail = ({ params }) => {
  const { isError, gif, isLoading } = useSingleGif({ id: params.id });

  if (isLoading) return <Spinner />;
  if (isError) return <Redirect to="/404" />;
  if (!gif) return null;

  return (
    <div className="detail">
      <div className="detail-container">
        <Gif id={gif.id} title={gif.title} url={gif.url} />
      </div>
    </div>
  );
};

export default Detail;
