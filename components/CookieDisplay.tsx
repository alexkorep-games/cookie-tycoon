
import React, { useRef, useState } from 'react';
import { FloatingNumberData } from '../types';
import { FloatingNumber } from './FloatingNumber';
import { COOKIE_CLICK_REWARD } from '../constants';

interface CookieDisplayProps {
  onClick: (x: number, y: number) => void;
  floatingNumbers: FloatingNumberData[];
  onRemoveFloatingNumber: (id: string) => void;
}

export const CookieDisplay: React.FC<CookieDisplayProps> = ({ onClick, floatingNumbers, onRemoveFloatingNumber }) => {
  const cookieRef = useRef<HTMLButtonElement>(null);
  const [isPulsing, setIsPulsing] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (cookieRef.current) {
      const rect = cookieRef.current.getBoundingClientRect();
      // Calculate click position relative to the cookie element itself
      // offsetX/Y are simpler if available and accurate
      const x = event.nativeEvent.offsetX; 
      const y = event.nativeEvent.offsetY;
      onClick(x, y);

      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 150); // Duration of pulse animation
    }
  };

  return (
    <div className="relative flex justify-center items-center w-full">
      <button
        ref={cookieRef}
        onClick={handleClick}
        className={`focus:outline-none transition-transform duration-100 active:scale-90 ${isPulsing ? 'animate-cookie-pulse' : ''}`}
        aria-label="Click to bake cookies"
      >
        <svg
          className="w-48 h-48 sm:w-64 sm:h-64 text-yellow-500 drop-shadow-2xl"
          viewBox="0 0 100 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#D2691E" /> {/* Main cookie color (saddlebrown) */}
          <circle cx="50" cy="50" r="46" stroke="#A0522D" strokeWidth="3" fill="none" /> {/* Slightly darker edge (sienna) */}
          {/* Chocolate chips */}
          <circle cx="30" cy="30" r="5" fill="#5C2C06" />
          <circle cx="70" cy="30" r="6" fill="#4A2507" />
          <circle cx="50" cy="50" r="7" fill="#5C2C06" />
          <circle cx="30" cy="70" r="5" fill="#4A2507" />
          <circle cx="70" cy="70" r="6" fill="#5C2C06" />
          <circle cx="40" cy="60" r="4" fill="#4A2507" />
          <circle cx="60" cy="40" r="5" fill="#5C2C06" />
          <circle cx="45" cy="20" r="4" fill="#4A2507" />
          <circle cx="65" cy="80" r="5" fill="#5C2C06" />
        </svg>
      </button>
      {floatingNumbers.map(fn => (
        <FloatingNumber
          key={fn.id}
          id={fn.id}
          value={fn.value}
          x={fn.x}
          y={fn.y}
          onAnimationEnd={onRemoveFloatingNumber}
        />
      ))}
    </div>
  );
};
