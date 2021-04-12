import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import getTrendings from "../../services/getTrendings";

const TrendigSearches = () => {
  const [trends, setTrends] = useState([]);
  useEffect(() => {
    getTrendings().then((res) => setTrends(res));
  }, []);
  return (
    <>
      <h2>Búsquedas populares populares</h2>
      <ul className="categories">
        {trends.map((item, index) => (
          <li className="category" key={index}>
            <Link to={`/search/${item.replace(" ", "-")}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TrendigSearches;
