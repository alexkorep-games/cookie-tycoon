import React from 'react';
import { formatNumber, formatNumberExact } from '../utils/formatters';

interface StatsDisplayProps {
  cookies: number;
  cps: number;
  cpc: number; // Cookies per click
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ cookies, cps, cpc }) => {
  return (
    <div className="w-full text-center p-4 bg-black bg-opacity-30 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-yellow-400" title={formatNumberExact(cookies)}>
        {formatNumber(cookies)}
      </h2>
      <p className="text-sm text-gray-300">cookies</p>
      
      <div className="mt-3 grid grid-cols-2 gap-2 text-yellow-200">
        <div>
            <p className="text-lg">{formatNumber(cps)}</p>
            <p className="text-xs text-gray-400">per second</p>
        </div>
        <div>
            <p className="text-lg">{formatNumber(cpc)}</p>
            <p className="text-xs text-gray-400">per click</p>
        </div>
      </div>
    </div>
  );
};