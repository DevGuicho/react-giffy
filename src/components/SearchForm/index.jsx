import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import "./SearchForm.css";

const RATINGS = ["g", "pg", "pg-13", "r"];

const SearchForm = ({ initialKeyword = "", initialRating = "", inHome }) => {
  const [search, setSearch] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") setSearch("");
  }, [location.pathname]);

  const history = useHistory();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${search.replace(" ", "-")}`);
  };

  return (
    <section className="SearchForm">
      <form className="search-form" onSubmit={handleSubmit}>
        <button className="btn">Buscar</button>
        <input
          className="search-nav__input"
          type="text"
          placeholder="Search a gif here..."
          onChange={handleChange}
          value={search}
        />
        <select name="" id="">
          <option disable="true">Rating content</option>
          {RATINGS.map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
      </form>
    </section>
  );
};

export default React.memo(SearchForm);
