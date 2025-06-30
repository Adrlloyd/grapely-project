export function getGeographyStyle(
  isWineProducer: boolean, 
  isSelected: boolean
) {
  const colors = {
    primary: '#7B2E5A',
    secondary: '#4A7C59',
    tertiary: '#E6C36F',
    defaultWineRegion: '#F7E6EC',
    transparent: 'transparent',
    stroke: '#A0AEC0',
    strokeHover: '#718096'
  };

  return {
    default: {
      fill: isWineProducer
        ? (isSelected ? colors.secondary : colors.defaultWineRegion)
        : colors.transparent,
      stroke: colors.stroke,
      strokeWidth: 0.5,
      outline: 'none',
      cursor: isWineProducer ? 'pointer' : 'default',
      transition: 'all 0.2s ease'
    },
    hover: {
      fill: isWineProducer ? colors.primary : colors.transparent,
      stroke: colors.strokeHover,
      strokeWidth: 0.7,
      outline: 'none',
      cursor: isWineProducer ? 'pointer' : 'default',
      filter: isWineProducer ? 'brightness(1.05)' : 'none'
    },
    pressed: {
      fill: colors.secondary,
      stroke: colors.strokeHover,
      strokeWidth: 0.8,
      outline: 'none',
      filter: 'brightness(0.95)'
    }
  };
}
