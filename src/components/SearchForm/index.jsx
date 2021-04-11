import React, { useState } from "react";

const SearchForm = ({ onSubmit }) => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ keyword });
  };
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <form className="search-nav" onSubmit={handleSubmit}>
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
