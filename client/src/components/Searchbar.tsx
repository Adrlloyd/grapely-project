import React, { useState } from 'react';
import '../styles/SearchBar.css';

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