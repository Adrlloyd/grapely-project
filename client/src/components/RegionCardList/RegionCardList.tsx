import { useEffect } from 'react';
import { getRegionEntries } from './getRegionEntries';
import type { RegionName } from '../../config/wineRegions';
import '../../styles/RegionCardList.css';
import { useRegionCarousel } from '../RegionCardList/useRegionCarousel';

interface Props {
  onSelect: (region: RegionName) => void;
}

export default function RegionCardList({ onSelect }: Props) {
  const originalRegions = getRegionEntries();
  const duplicatedRegions = [
    originalRegions[originalRegions.length - 1],
    ...originalRegions,
    originalRegions[0]
  ];

  const {
    trackRef,
    cardRefs,
    activeIndex,
    scrollLeft,
    scrollRight,
    centerInitialCard
  } = useRegionCarousel();

  useEffect(() => {
    centerInitialCard();
  }, [centerInitialCard]);

  return (
    <div className="region-carousel">
      <button className="carousel-button left" onClick={() => scrollLeft(duplicatedRegions.length)}>‹</button>

      <div className="region-carousel-track" ref={trackRef}>
        {duplicatedRegions.map(([name], index) => (
          <div
            key={`${name}-${index}`}
            className={`region-card-wrapper ${index === activeIndex ? 'active' : ''}`}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
          >
            <button onClick={() => onSelect(name)} className="region-button">
              {name}
            </button>
          </div>
        ))}
      </div>

      <button className="carousel-button right" onClick={() => scrollRight(duplicatedRegions.length)}>›</button>
    </div>
  );
}