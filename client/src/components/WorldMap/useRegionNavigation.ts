import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import type { RegionName } from '../../config/wineRegions';

// This custom hook handles:
// - reading the region from URL
// - storing selected region and country
// - navigating when both are set
export function useRegionNavigation() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(search);
  const regionFromQuery = query.get('region') as RegionName | null;

  const [selectedRegion, setSelectedRegion] = useState<RegionName | null>(regionFromQuery);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    if (selectedRegion && selectedCountry) {
      const encodedRegion = encodeURIComponent(selectedRegion);
      const encodedCountry = encodeURIComponent(selectedCountry);
      navigate(`/selection?country=${encodedCountry}&region=${encodedRegion}`);
    }
  }, [selectedRegion, selectedCountry, navigate]);

  return {
    selectedRegion,
    setSelectedRegion,
    selectedCountry,
    setSelectedCountry
  };
}