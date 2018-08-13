import React from 'react';
import './Search.css';

const Search = ({ onSearchTermChange, onSubmitSearch, searchTerm, handleSearch }) => {
  return (
    <form onSubmit={onSubmitSearch}>
      <input type="text" value={searchTerm} onChange={onSearchTermChange} />
      <button className="search-button fa fa-search" onClick={handleSearch} />
    </form>
  );
};

export default Search;
