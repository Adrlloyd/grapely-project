import { useEffect, useRef, useState } from 'react';
import { getRegionEntries } from './getRegionEntries';
import type { RegionName } from '../../config/wineRegions';
import '../../styles/RegionCardList.css';

interface Props {
  onSelect: (region: RegionName) => void;
}

export default function RegionCardList({ onSelect }: Props) {
  const originalRegions = getRegionEntries();
  const duplicatedRegions = [
    originalRegions[originalRegions.length - 1], // clone last
    ...originalRegions,
    originalRegions[0] // clone first
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(1); // index 1 is first real card

  // Scroll to the first real card on mount
  useEffect(() => {
    const container = trackRef.current;
    const card = cardRefs.current[1];
    if (container && card) {
      const offset = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
      container.scrollTo({ left: offset });
    }
  }, []);

  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = trackRef.current;
    const card = cardRefs.current[index];
    if (container && card) {
      const offset = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior });
      setActiveIndex(index);
    }
  };

  const scrollLeft = () => {
    const container = trackRef.current;
    const nextIndex = activeIndex - 1;

    if (!container) return;

    if (nextIndex === 0) {
      scrollToIndex(nextIndex); // scroll to cloned first

      const handleScrollEnd = () => {
        container.removeEventListener('scrollend', handleScrollEnd);
        const lastRealIndex = duplicatedRegions.length - 2;
        scrollToIndex(lastRealIndex, 'auto');
        setActiveIndex(lastRealIndex);
      };

      container.addEventListener('scrollend', handleScrollEnd, { once: true });
    } else {
      scrollToIndex(nextIndex);
    }
  };

  const scrollRight = () => {
    const container = trackRef.current;
    const nextIndex = activeIndex + 1;

    if (!container) return;

    if (nextIndex === duplicatedRegions.length - 1) {
      scrollToIndex(nextIndex); // scroll to cloned last

      const handleScrollEnd = () => {
        container.removeEventListener('scrollend', handleScrollEnd);
        scrollToIndex(1, 'auto'); // silent jump
        setActiveIndex(1);
      };

      container.addEventListener('scrollend', handleScrollEnd, { once: true });
    } else {
      scrollToIndex(nextIndex);
    }
  };

  return (
    <div className="region-carousel">
      <button className="carousel-button left" onClick={scrollLeft}>‹</button>

      <div className="region-carousel-track" ref={trackRef}>
        {duplicatedRegions.map(([name], index) => (
          <div
            key={`${name}-${index}`}
            className={`region-card-wrapper ${index === activeIndex ? 'active' : ''}`}
            ref={(el) => { (cardRefs.current[index] = el)}}
          >
            <button onClick={() => onSelect(name)} className="region-button">
              {name}
            </button>
          </div>
        ))}
      </div>

      <button className="carousel-button right" onClick={scrollRight}>›</button>
    </div>
  );
}