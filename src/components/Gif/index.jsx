import React from "react";
import { Link } from "wouter";

const Gif = ({ title, url, id }) => {
  return (
    <div className="Gif">
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
