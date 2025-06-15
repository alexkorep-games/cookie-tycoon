import { Upgrade } from './types';

export const COOKIE_CLICK_REWARD: number = 1; // Base cookies per click before upgrades
export const COST_INCREASE_FACTOR: number = 1.15; // Each upgrade costs 15% more than the last
export const GAME_TICK_INTERVAL: number = 1000; // ms, for CPS updates

export const INITIAL_UPGRADES: Omit<Upgrade, 'currentCost' | 'owned'>[] = [
  // CPS Upgrades
  {
    id: 'cursor',
    name: 'Auto-Clicker',
    icon: '🖱️',
    baseCost: 15,
    effectType: 'cps',
    baseEffectValue: 1,
    description: 'Clicks the cookie for you.'
  },
  {
    id: 'grandma',
    name: 'Grandma',
    icon: '👵',
    baseCost: 100,
    effectType: 'cps',
    baseEffectValue: 5,
    description: 'Bakes cookies with love.'
  },
  {
    id: 'farm',
    name: 'Cookie Farm',
    icon: '🌾',
    baseCost: 1100,
    effectType: 'cps',
    baseEffectValue: 40,
    description: 'Grows cookie plants.'
  },
  {
    id: 'mine',
    name: 'Cookie Mine',
    icon: '⛏️',
    baseCost: 12000,
    effectType: 'cps',
    baseEffectValue: 250,
    description: 'Extracts raw cookie dough.'
  },
  {
    id: 'factory',
    name: 'Cookie Factory',
    icon: '🏭',
    baseCost: 130000,
    effectType: 'cps',
    baseEffectValue: 1500,
    description: 'Mass produces cookies.'
  },
  {
    id: 'bank',
    name: 'Cookie Bank',
    icon: '🏦',
    baseCost: 1400000,
    effectType: 'cps',
    baseEffectValue: 10000,
    description: 'Generates interest in cookies.'
  },
  {
    id: 'temple',
    name: 'Cookie Temple',
    icon: '🏯',
    baseCost: 20000000,
    effectType: 'cps',
    baseEffectValue: 75000,
    description: 'Pray for more cookies.'
  },
  // Click Power Upgrades
  {
    id: 'reinforcedFinger',
    name: 'Reinforced Finger',
    icon: '💪',
    baseCost: 50,
    effectType: 'click',
    baseEffectValue: 1,
    description: 'Your clicks are stronger.'
  },
  {
    id: 'steelMouse',
    name: 'Steel-Tipped Mouse',
    icon: '🖱️✨',
    baseCost: 500,
    effectType: 'click',
    baseEffectValue: 5,
    description: 'State-of-the-art clicking tech.'
  },
  {
    id: 'multiplierWand',
    name: 'Cookie Multiplier Wand',
    icon: '✨🪄',
    baseCost: 10000,
    effectType: 'click',
    baseEffectValue: 50,
    description: 'Magically multiplies cookies on click.'
  },
  {
    id: 'goldenKnuckles',
    name: 'Golden Knuckles',
    icon: '✊🌟',
    baseCost: 150000, // Roughly 15x previous
    effectType: 'click',
    baseEffectValue: 250, // Roughly 5x previous
    description: 'Feel the Midas touch in every click.'
  },
  {
    id: 'gemEncrustedClicker',
    name: 'Gem-Encrusted Clicker',
    icon: '💎🖱️',
    baseCost: 2000000, // Roughly 13x previous
    effectType: 'click',
    baseEffectValue: 1200, // Roughly 4.8x previous
    description: 'Clicks with the brilliance of a thousand gems.'
  },
  {
    id: 'cosmicClickRay',
    name: 'Cosmic Click Ray',
    icon: '🌌🔫',
    baseCost: 30000000, // 15x previous
    effectType: 'click',
    baseEffectValue: 8000, // Roughly 6.6x previous
    description: 'Harness cosmic energy for unimaginable clicks.'
  },
  {
    id: 'realityBendingClick',
    name: 'Reality Bending Click',
    icon: '🌀👆',
    baseCost: 500000000, // Roughly 16.6x previous
    effectType: 'click',
    baseEffectValue: 50000, // Roughly 6.25x previous
    description: 'Clicks so powerful, they warp reality (and bake cookies).'
  }
];
