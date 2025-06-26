import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Wine } from '../types/wine';
import '../styles/RandomButton.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const formatPrice = (price?: number) => {
  if (!price) return 'Price not available';
  return `$${price.toFixed(2)}`;
};

const RandomButton = () => {
  const [wine, setWine] = useState<Wine | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    const response = await fetch(`${API_BASE_URL}/api/random`);
    const data = await response.json();
    setWine(data);
    setModalOpen(true);
  };

  // modal snippet
  useEffect(() => {
    if (!modalOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [modalOpen]);

  const handleCardClick = () => {
    if (wine) {
      navigate('/summary', { state: { wine } });
      setModalOpen(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Random</button>
      {modalOpen && wine && (
        <div className="random-button-modal-overlay">
          <div ref={modalRef} className="random-button-modal-content">
            <button
              onClick={() => setModalOpen(false)}
              className="random-button-modal-close"
              aria-label="Close"
            >×</button>
            <div
              className="searchbar-result-item"
              style={{ cursor: 'pointer' }}
              onClick={handleCardClick}
              tabIndex={0}
              role="button"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(); }}
            >
              <div className="wine-info">
                <h3>{wine.name}</h3>
                <div className="wine-details">
                  {wine.grape && <span className="grape">Grape: {wine.grape}</span>}
                  {wine.color && <span className="color">Color: {wine.color}</span>}
                  {wine.country && <span className="country">Country: {wine.country}</span>}
                  {wine.price && <span className="price">{formatPrice(wine.price)}</span>}
                </div>
              </div>
              {wine.image_url && (
                <div className="wine-image">
                  <img src={`${API_BASE_URL}/${wine.image_url}`} alt={wine.name} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomButton;  