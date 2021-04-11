import React from "react";
import Gift from "../Gif/";
import "./styles.css";

const ListOfGifs = ({ gifs }) => {
  return (
    <div className="ListOfGifs">
      {gifs.map(({ id, title, url }) => (
        <Gift key={id} title={title} url={url} id={id} />
      ))}
    </div>
  );
};

export default ListOfGifs;
