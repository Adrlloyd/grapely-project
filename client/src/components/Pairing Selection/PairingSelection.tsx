import { useEffect } from 'react';
import { usePairingCarousel } from './usePairingCarousel';
import '../../styles/PariingCarousel.css';

interface PairingSelectionProps {
  onSelect: (pairing: string) => void;
  availableOptions: string[];
}

function PairingSelection({ onSelect, availableOptions }: PairingSelectionProps) {
  const {
    trackRef,
    cardRefs,
    activeIndex,
    scrollLeft,
    scrollRight,
    centerInitialCard
  } = usePairingCarousel();

  // Clone last and first to enable seamless looping
  const clonedOptions = [
    availableOptions[availableOptions.length - 1],
    ...availableOptions,
    availableOptions[0],
  ];

  useEffect(() => {
    centerInitialCard();
  }, [centerInitialCard]);

  return (
    <div className="pairing-selection">
      <h2 className="pairing-title">What do you fancy eating?</h2>

      <div className="pairing-carousel">
        <button
          className="carousel-button left"
          onClick={() => scrollLeft(clonedOptions.length)}>‹</button>

        <div className="pairing-carousel-track" ref={trackRef}>
          {clonedOptions.map((option, index) => (
            <div
              key={`${option}-${index}`}
              className={`pairing-card-wrapper ${index === activeIndex ? 'active' : ''}`}
              ref={(el) => {(cardRefs.current[index] = el)}}
            >
              <button
                onClick={() => onSelect(option)}
                className="pairing-button">
                {option}
              </button>
            </div>
          ))}
        </div>

        <button
          className="carousel-button right"
          onClick={() => scrollRight(clonedOptions.length)}>›</button>
      </div>
    </div>
  );
}

export default PairingSelection;