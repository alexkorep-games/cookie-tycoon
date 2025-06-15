
import React, { useEffect, useState } from 'react';

interface FloatingNumberProps {
  id: string;
  value: number;
  x: number;
  y: number;
  onAnimationEnd: (id: string) => void;
}

export const FloatingNumber: React.FC<FloatingNumberProps> = ({ id, value, x, y, onAnimationEnd }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Start fade out
      // Call onAnimationEnd after the animation duration to remove from DOM
      // This timeout should match the animation duration
      const removalTimer = setTimeout(() => onAnimationEnd(id), 1000); 
      return () => clearTimeout(removalTimer);
    }, 50); // Small delay before starting animation to ensure it's rendered first
    
    // Cleanup main timer if component unmounts early
    return () => clearTimeout(timer);
  }, [id, onAnimationEnd]);

  if (!visible) { // This will eventually remove the element after animation ends via parent
      // Still need to render something for the animation to complete if triggered by visibility
      // The parent will remove it based on onAnimationEnd.
      // This local visible state is mainly for triggering the animation start.
  }

  return (
    <div
      className="absolute text-xl sm:text-2xl font-bold text-yellow-300 pointer-events-none select-none animate-float-up drop-shadow-md"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)', // Center the number on the click
      }}
    >
      +{value}
    </div>
  );
};
