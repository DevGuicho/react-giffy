import React, { useState } from "react";
import { useHistory } from "react-router";
import "./SearchForm.css";

const RATINGS = ["g", "pg", "pg-13", "r"];

const SearchForm = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${keyword.replace(/ /g, "-")}`);
  };

  return (
    <section className="SearchForm">
      <form className="search-form" onSubmit={handleSubmit}>
        <button className="btn" type="submit">
          Buscar
        </button>
        <input
          className="search-nav__input"
          type="text"
          name="search"
          id="search"
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

export default SearchForm;
