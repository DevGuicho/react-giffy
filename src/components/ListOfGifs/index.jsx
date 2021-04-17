import Gif from "components/Gif";
import React from "react";
import "./ListOfGifs.css";
const ListOfGifs = ({ title, listOfGifs }) => {
  return (
    <section className="ListOfGifs">
      <h2>{title}</h2>
      <ol className="ListOfGifs-grid">
        {listOfGifs.map((gif) => (
          <li className="ListOfGifs-item" key={gif.id}>
            <Gif id={gif.id} url={gif.url} title={gif.title} />
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ListOfGifs;
