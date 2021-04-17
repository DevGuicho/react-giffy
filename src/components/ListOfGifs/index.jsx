import Gif from "components/Gif";
import React from "react";

const ListOfGifs = ({ title, listOfGifs }) => {
  return (
    <section>
      <h2>{title}</h2>
      <ol>
        {listOfGifs.map((gif) => (
          <li key={gif.id}>
            <Gif id={gif.id} url={gif.url} title={gif.title} />
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ListOfGifs;
