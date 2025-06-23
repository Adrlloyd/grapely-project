import React, { useState } from 'react';
import '../styles/Searchbar.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      return;
    }
    try {
      const response = await fetch('');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    }
  };

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSubmit} className="searchbar-form">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          className="searchbar-input"
          autoComplete="off"
        />
        <button
          type="submit"
          className="searchbar-button"
        >
          Search
        </button>
      </form>
      {query && (
        <div className="searchbar-dropdown">
          {results.length > 0 ? (
            <ul>
              {results.map(wine => (
                <li key={wine.id}>{wine.name}</li>
              ))}
            </ul>
          ) : (
            <div className="searchbar-no-results">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;