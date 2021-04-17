import React from "react";
import Spinner from "components/Spinner";
import useTrendings from "Hooks/useTrendings";
import { Link } from "react-router-dom";
import "./ListOfTrendings.css";

const ListOfTrendings = () => {
  const { isLoading, ListOfTrendings } = useTrendings();

  return (
    <section className="TrendingSearches">
      <h2>Busquedas Populares</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <ol className="categories">
          {ListOfTrendings.map((trending) => (
            <li className="categorie" key={trending}>
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
