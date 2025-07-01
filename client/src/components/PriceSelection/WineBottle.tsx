interface WineBottleProps {
  fillPercentage: number; // 0 to 100
}

function WineBottle({ fillPercentage }: WineBottleProps) {
  const viewBoxHeight = 88;
  
  const safeFillPercentage = Math.max(0, Math.min(100, fillPercentage));
  
  const fillHeight = (safeFillPercentage / 100) * viewBoxHeight;
  const fillY = viewBoxHeight - fillHeight;

  return (
    <svg
      viewBox="20 0 60 80"
      xmlns="http://www.w3.org/2000/svg"
      className="wine-bottle-svg"
    >
      <defs>
        <clipPath id="bottle-clip">
          <path d="M52.78,11.63A1.39,1.39,0,0,1,54.17,13v.18a.46.46,0,0,1,.43.46V16a.46.46,0,0,1-.43.46V32.37c0,5,5.81,5,5.81,14.34v38.7a3,3,0,0,1-3,3H43a3,3,0,0,1-3-3V46.71c0-9.31,5.81-9.31,5.81-14.34V16.46A.46.46,0,0,1,45.4,16V13.66a.46.46,0,0,1,.43-.46V13a1.39,1.39,0,0,1,1.39-1.39h5.56Z" />
        </clipPath>
      </defs>

      <rect
        x="0"
        y={fillY}
        width="100"
        height={fillHeight}
        fill="#7B2E5A"
        clipPath="url(#bottle-clip)"
      />

      <path
        d="M52.78,11.63A1.39,1.39,0,0,1,54.17,13v.18a.46.46,0,0,1,.43.46V16a.46.46,0,0,1-.43.46V32.37c0,5,5.81,5,5.81,14.34v38.7a3,3,0,0,1-3,3H43a3,3,0,0,1-3-3V46.71c0-9.31,5.81-9.31,5.81-14.34V16.46A.46.46,0,0,1,45.4,16V13.66a.46.46,0,0,1,.43-.46V13a1.39,1.39,0,0,1,1.39-1.39h5.56Z"
        fill="none"
        stroke="#4A7C59"
        strokeWidth="2"
      />
    </svg>
  );
}

export default WineBottle;