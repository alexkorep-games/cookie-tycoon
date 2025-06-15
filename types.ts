export interface Upgrade {
  id: string;
  name: string;
  icon: string;
  baseCost: number;
  currentCost: number;
  effectType: 'cps' | 'click'; // Determines if the upgrade affects CPS or click power
  baseEffectValue: number; // Value for CPS or click bonus depending on effectType
  owned: number;
  description: string;
}

export interface FloatingNumberData {
  id: string; // Use string for UUID or timestamp-based ID
  value: number;
  x: number;
  y: number;
  timestamp: number; // To help manage removal if needed, or for unique key
}