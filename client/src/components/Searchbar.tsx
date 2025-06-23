import React, { useState } from 'react';
import './Searchbar.css';

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
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        style={{
          padding: '0.5rem',
          borderRadius: '4px 0 0 4px',
          border: '1px solid #ccc',
          outline: 'none'
        }}
      />
      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '0 4px 4px 0',
          border: '1px solid #ccc',
          borderLeft: 'none',
          background: '#eee',
          cursor: 'pointer'
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;