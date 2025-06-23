import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // just logging
    console.log('Search for:', query);
  };

  return (
    <form className="searchbar-form" onSubmit={handleSubmit}>
      <input
        className="searchbar-input"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <button className="searchbar-button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;