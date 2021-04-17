import Favorite from "components/Favorite";
import React from "react";
import { Link } from "react-router-dom";
import "./Gif.css";

const Gif = ({ url, id, title }) => {
  return (
    <div className="Gif">
      <Link className="Gif__link" to={`/gif/${id}`}>
        <img src={url} alt="" loading="lazy" />
        <h4>{title}</h4>
      </Link>
      <Favorite url={url} gifId={id} />
    </div>
  );
};

export default Gif;
