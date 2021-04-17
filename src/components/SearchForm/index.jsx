import React, { useState } from "react";
import { useHistory } from "react-router";

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
    <section>
      <form onSubmit={handleSubmit}>
        <button type="submit">Buscar</button>
        <input type="text" name="search" id="search" onChange={handleChange} />
      </form>
    </section>
  );
};

export default SearchForm;
