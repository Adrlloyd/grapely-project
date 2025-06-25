export function getGeographyStyle(isWineProducer: boolean, isSelected: boolean) {
  return {
    default: {
      fill: isWineProducer
        ? (isSelected ? '#4A7C59' : '#F7E6EC') // selected or default wine color
        : 'transparent',
      stroke: '#AAA',
      strokeWidth: 0.5,
      outline: 'none',
      cursor: isWineProducer ? 'pointer' : 'default'
    },
    hover: {
      fill: isWineProducer ? '#7B2E5A' : 'transparent', // hover color for wine countries
      stroke: '#888',
      strokeWidth: 0.5,
      outline: 'none',
      cursor: isWineProducer ? 'pointer' : 'default'
    },
    pressed: {
      fill: '#4A7C59', // consistent with selected state
      outline: 'none'
    }
  };
}
