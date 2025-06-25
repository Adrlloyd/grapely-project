import React, { useState, useEffect, useCallback } from 'react';
import type { Wine } from '../types/wine';
import '../styles/SearchBar.css';

interface SearchBarProps {
  autoFocus?: boolean;
  onClose?: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const SearchBar: React.FC<SearchBarProps> = ({ autoFocus = false, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  // this is to prevent the predictive search from triggering too many times
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: number;
      return (searchQuery: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          performSearch(searchQuery);
        }, 300); // 300ms delay
      };
    })(),
    []
  );

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Failed to fetch results.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await performSearch(query);
  };

  // clear results when query is empty
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
    }
  }, [query]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Escape key to close search (mobile mode)
  useEffect(() => {
    if (!onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const formatPrice = (price?: number) => {
    if (!price) return 'Price not available';
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="searchbar-container">
      <form className="searchbar-form" onSubmit={handleSubmit}>
        <input
          className="searchbar-input"
          type="text"
          placeholder="Search wines..."
          value={query}
          onChange={handleInputChange}
          autoFocus={autoFocus}
        />
        <button className="searchbar-button" type="submit">
          {isMobile ? 'Q' : 'Search'}
        </button>
      </form>
      {loading && <div className="loading">Searching...</div>}
      {error && <div className="error">{error}</div>}
      {results.length > 0 && !loading && !error && (
        <div className="searchbar-dropdown">
          <ul className="searchbar-results">
            {/* this is the mapped list of results */}
            {results.map((result) => (
              <li key={result.id} className="searchbar-result-item">
                <div className="wine-info">
                  <h3>{result.name}</h3>
                  <div className="wine-details">
                    {result.grape && <span className="grape">Grape: {result.grape}</span>}
                    {result.color && <span className="color">Color: {result.color}</span>}
                    {/* {result.sparkling && <span className="sparkling">✨ Sparkling</span>}
                    {result.region && <span className="region">Region: {result.region}</span>} */}
                    {result.country && <span className="country">Country: {result.country}</span>}
                    {result.price && <span className="price">{formatPrice(result.price)}</span>}
                  </div>
                  {/* {result.description && (
                    <p className="description">{result.description}</p>
                  )}
                  {result.pairingOptions.length > 0 && (
                    <div className="pairings">
                      <strong>Pairings:</strong> {result.pairingOptions.join(', ')}
                    </div>
                  )} */}
                </div>
                {result.image_url && (
                  <div className="wine-image">
                    {/* <img src={result.image_url} alt={result.name} /> */}
                    <img src={`${API_BASE_URL}/${result.image_url}`} alt={result.name} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;