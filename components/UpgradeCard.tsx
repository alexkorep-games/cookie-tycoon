import React from 'react';
import { Upgrade } from '../types';
import { formatNumber } from '../utils/formatters';

interface UpgradeCardProps {
  upgrade: Upgrade;
  onBuy: () => void;
  currentCookies: number;
}

export const UpgradeCard: React.FC<UpgradeCardProps> = ({ upgrade, onBuy, currentCookies }) => {
  const canAfford = currentCookies >= upgrade.currentCost;

  const effectText = upgrade.effectType === 'cps' 
    ? `CPS: +${formatNumber(upgrade.baseEffectValue)} each`
    : `Click: +${formatNumber(upgrade.baseEffectValue)} each`;

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out
                     ${canAfford ? 'bg-green-700 bg-opacity-30 hover:bg-opacity-50' : 'bg-red-700 bg-opacity-20 opacity-70'}`}>
      <div className="flex items-center space-x-4">
        <span className="text-3xl select-none">{upgrade.icon}</span>
        <div>
          <h3 className="text-lg font-semibold text-yellow-200">{upgrade.name}</h3>
          <p className="text-xs text-gray-400">{upgrade.description}</p>
          <p className="text-xs text-yellow-400">{effectText}</p>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm text-gray-300">Owned: {upgrade.owned}</p>
        <p className={`text-sm font-medium ${canAfford ? 'text-green-300' : 'text-red-300'}`}>
          Cost: {formatNumber(upgrade.currentCost)}
        </p>
        <button
          onClick={onBuy}
          disabled={!canAfford}
          className={`mt-1 px-4 py-2 text-sm font-semibold rounded-md transition-colors
                     ${canAfford
                       ? 'bg-yellow-500 hover:bg-yellow-400 text-yellow-900 focus:ring-2 focus:ring-yellow-300'
                       : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
          aria-label={`Buy ${upgrade.name} for ${formatNumber(upgrade.currentCost)} cookies`}
        >
          Buy
        </button>
      </div>
    </div>
  );
};