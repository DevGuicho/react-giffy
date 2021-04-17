import React from "react";
import { Link } from "react-router-dom";

const Gif = ({ url, id, title }) => {
  return (
    <Link to={`/gif/${id}`}>
      <img src={url} alt="" />
      <h4>{title}</h4>
    </Link>
  );
};

export default Gif;
