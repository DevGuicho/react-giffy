import React from "react";
import Spinner from "components/Spinner";
import useTrendings from "Hooks/useTrendings";
import { Link } from "react-router-dom";

const ListOfTrendings = () => {
  const { isLoading, ListOfTrendings } = useTrendings();

  return (
    <section className="ListOfTrendings">
      <h2>Busquedas Populares</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <ol>
          {ListOfTrendings.map((trending) => (
            <li key={trending}>
              <Link to={`/search/${trending.replace(/ /g, "-")}`}>
                {trending}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};

export default ListOfTrendings;
