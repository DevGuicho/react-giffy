import React from "react";
import { useLocation } from "wouter";
import { useForm } from "./hooks";

const RATINGS = ["g", "pg", "pg-13", "r"];

const SearchForm = ({ initialKeyword = "", initialRating = "" }) => {
  const { keyword, rating, updateKeyword, updateRating } = useForm({
    initialKeyword,
    initialRating,
  });

  const [, pushLocation] = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    pushLocation(`/search/${keyword.replace(" ", "-")}/${rating}`);
  };

  const handleChange = (e) => {
    updateKeyword(e.target.value);
  };

  const handleChangeRating = (e) => {
    updateRating(e.target.value);
  };

  return (
    <form className="search-nav" onSubmit={handleSubmit}>
      <select name="" id="" onChange={handleChangeRating}>
        <option disable="true">Rating content</option>
        {RATINGS.map((rating) => (
          <option key={rating} value={rating}>
            {rating}
          </option>
        ))}
      </select>
      <input
        className="search-nav__input"
        type="text"
        placeholder="Search a gif here..."
        value={keyword}
        onChange={handleChange}
      />
      <button className="search-nav__btn">Buscar</button>
    </form>
  );
};

export default React.memo(SearchForm);
