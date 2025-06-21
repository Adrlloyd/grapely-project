import { wineRegions } from '../config/wineRegions';
import type { RegionName } from '../config/wineRegions';
import '../styles/RegionCardList.css';

interface Props {
  onSelect: (region: RegionName) => void;
}

export default function RegionCardList({ onSelect }: Props) {
  return (
    <>
      <div className="region-buttons mobile">
        {Object.entries(wineRegions).map(([name]) => (
          <button
            key={name}
            onClick={() => onSelect(name as RegionName)}
            className="region-button"
          >
            {name}
          </button>
        ))}
      </div>

      <div className="region-buttons desktop">
        {Object.entries(wineRegions).map(([name]) => (
          <button
            key={name}
            onClick={() => onSelect(name as RegionName)}
            className="region-button desktop-button"
          >
            {name}
          </button>
        ))}
      </div>
    </>
  );
}