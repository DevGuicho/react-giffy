import React from "react";
import { Link } from "wouter";
import Fav from "../Fav";
import "./Gif.css";
const Gif = ({ title, url, id, detail }) => {
  if (detail)
    return (
      <div className="Gif">
        <div className="ListOfGifs-item">
          <h4>{title}</h4>
          <img loading="lazy" src={url} alt="gif" />
        </div>
      </div>
    );
  return (
    <div className="Gif">
      <div className="Gif-button-fav">
        <Fav id={id} url={url} />
      </div>
      <Link to={`/gif/${id}`} className="ListOfGifs-item">
        <h4>{title}</h4>
        <img loading="lazy" src={url} alt="gif" />
      </Link>
    </div>
  );
};

export default React.memo(
  Gif,
  (prevProps, nextProps) => prevProps.id === nextProps.id
);
