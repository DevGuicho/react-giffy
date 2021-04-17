import Favorite from "components/Favorite";
import React from "react";
import { Link } from "react-router-dom";

const Gif = ({ url, id, title }) => {
  return (
    <div className="Gif">
      <Link to={`/gif/${id}`}>
        <img src={url} alt="" />
        <h4>{title}</h4>
      </Link>
      <Favorite url={url} gifId={id} />
    </div>
  );
};

export default Gif;
