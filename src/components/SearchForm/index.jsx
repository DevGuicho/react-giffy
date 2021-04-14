import React, { useState } from "react";
import { useHistory } from "react-router";
import "./SearchForm.css";

const RATINGS = ["g", "pg", "pg-13", "r"];

const SearchForm = ({ initialKeyword = "", initialRating = "" }) => {
  const [search, setSearch] = useState("");
  const history = useHistory();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("lastKeyword", search);
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
