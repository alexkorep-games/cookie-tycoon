import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Upgrade, FloatingNumberData } from './types';
import { INITIAL_UPGRADES, COST_INCREASE_FACTOR, COOKIE_CLICK_REWARD, GAME_TICK_INTERVAL } from './constants';
import { StatsDisplay } from './components/StatsDisplay';
import { CookieDisplay } from './components/CookieDisplay';
import { UpgradeCard } from './components/UpgradeCard';
import { formatNumber } from './utils/formatters';

const App: React.FC = () => {
  const [cookies, setCookies] = useState<number>(0);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(() =>
    INITIAL_UPGRADES.map(u => ({
      ...u,
      currentCost: u.baseCost,
      owned: 0,
    }))
  );
  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumberData[]>([]);
  const [lastSaveTime, setLastSaveTime] = useState<number>(Date.now());

  const cookiesPerSecond = useMemo(() => {
    return upgrades
      .filter(upg => upg.effectType === 'cps')
      .reduce((total, upg) => total + upg.owned * upg.baseEffectValue, 0);
  }, [upgrades]);

  const cookiesPerClick = useMemo(() => {
    const clickBonusFromUpgrades = upgrades
      .filter(upg => upg.effectType === 'click')
      .reduce((total, upg) => total + upg.owned * upg.baseEffectValue, 0);
    return COOKIE_CLICK_REWARD + clickBonusFromUpgrades;
  }, [upgrades]);

  // Load game state from localStorage
  useEffect(() => {
    const savedCookies = localStorage.getItem('cookieClicker_cookies');
    const savedUpgrades = localStorage.getItem('cookieClicker_upgrades');
    if (savedCookies) {
      setCookies(parseFloat(savedCookies));
    }
    if (savedUpgrades) {
      // Need to ensure loaded upgrades have the correct new structure,
      // potentially migrating old save data if structure changed significantly.
      // For this change, if old saves exist without effectType/baseEffectValue,
      // they might not work perfectly without migration logic.
      // However, newly saved data will be fine.
      try {
        const parsedUpgrades = JSON.parse(savedUpgrades);
        // Basic validation or mapping if needed
        const validatedUpgrades = parsedUpgrades.map((savedUpg: any) => {
          const template = INITIAL_UPGRADES.find(initUpg => initUpg.id === savedUpg.id);
          return {
            ...template, // provides defaults like effectType, baseEffectValue
            ...savedUpg, // overrides with saved data like owned, currentCost
          };
        }).filter(Boolean); // remove any upgrades that no longer exist in INITIAL_UPGRADES
         setUpgrades(validatedUpgrades as Upgrade[]);
      } catch (error) {
        console.error("Failed to parse saved upgrades:", error);
         // Fallback to initial state if parsing fails
        setUpgrades(INITIAL_UPGRADES.map(u => ({
          ...u,
          currentCost: u.baseCost,
          owned: 0,
        })));
      }
    }
  }, []);

  // Save game state to localStorage periodically
  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem('cookieClicker_cookies', cookies.toString());
      localStorage.setItem('cookieClicker_upgrades', JSON.stringify(upgrades));
      setLastSaveTime(Date.now());
    }, 5000); // Save every 5 seconds
    return () => clearInterval(saveInterval);
  }, [cookies, upgrades]);


  // Game loop for CPS
  useEffect(() => {
    const timer = setInterval(() => {
      setCookies(prevCookies => prevCookies + cookiesPerSecond * (GAME_TICK_INTERVAL / 1000));
    }, GAME_TICK_INTERVAL);
    return () => clearInterval(timer);
  }, [cookiesPerSecond]);

  const handleCookieClick = useCallback((x: number, y: number) => {
    const currentClickValue = cookiesPerClick;
    setCookies(prev => prev + currentClickValue);
    const newFloatingNumber: FloatingNumberData = {
      id: Date.now().toString() + Math.random().toString(), 
      value: currentClickValue,
      x,
      y,
      timestamp: Date.now(),
    };
    setFloatingNumbers(prev => [...prev, newFloatingNumber]);
  }, [cookiesPerClick]);

  const removeFloatingNumber = useCallback((id: string) => {
    setFloatingNumbers(prev => prev.filter(fn => fn.id !== id));
  }, []);

  const handleBuyUpgrade = useCallback((upgradeId: string) => {
    const upgradeToBuy = upgrades.find(u => u.id === upgradeId);
    if (!upgradeToBuy || cookies < upgradeToBuy.currentCost) return;

    setCookies(prevCookies => prevCookies - upgradeToBuy.currentCost);
    setUpgrades(prevUpgrades =>
      prevUpgrades.map(u =>
        u.id === upgradeId
          ? {
              ...u,
              owned: u.owned + 1,
              currentCost: Math.floor(u.baseCost * Math.pow(COST_INCREASE_FACTOR, u.owned + 1)),
            }
          : u
      )
    );
  }, [cookies, upgrades]);
  
  const totalCookiesEarnedAllTime = () => {
    const spentOnUpgrades = upgrades.reduce((total, u) => {
        let costSum = 0;
        // This formula sums costs for geometrically increasing prices
        // S_n = a * (r^n - 1) / (r - 1) where a is baseCost, r is COST_INCREASE_FACTOR, n is owned
        // However, we recalculate cost each time, so summing actual past costs:
        for (let i = 0; i < u.owned; i++) {
            costSum += Math.floor(u.baseCost * Math.pow(COST_INCREASE_FACTOR, i));
        }
        return total + costSum;
    }, 0);
    return cookies + spentOnUpgrades;
  };

  const cpsUpgrades = useMemo(() => upgrades.filter(u => u.effectType === 'cps'), [upgrades]);
  const clickUpgrades = useMemo(() => upgrades.filter(u => u.effectType === 'click'), [upgrades]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-100 selection:bg-yellow-500 selection:text-yellow-900">
      <header className="w-full max-w-5xl mb-6 text-center">
        <h1 className="text-5xl font-bold text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] tracking-wider">
          Cookie Tycoon
        </h1>
        <p className="text-sm text-gray-400 mt-1">Last saved: {new Date(lastSaveTime).toLocaleTimeString()}</p>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Cookie and Stats */}
        <section className="md:col-span-1 flex flex-col items-center space-y-6 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-2xl">
          <StatsDisplay cookies={cookies} cps={cookiesPerSecond} cpc={cookiesPerClick} />
          <CookieDisplay onClick={handleCookieClick} floatingNumbers={floatingNumbers} onRemoveFloatingNumber={removeFloatingNumber} />
        </section>

        {/* Right Column: Upgrades */}
        <section className="md:col-span-2 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-2xl">
          <div className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-700">
            <div>
              <h2 className="text-3xl font-semibold mb-4 text-yellow-300 text-center sticky top-0 bg-gray-800 bg-opacity-80 py-2 z-10">Automation Upgrades</h2>
              <div className="space-y-3 mb-8">
                {cpsUpgrades.map(upgrade => (
                  <UpgradeCard
                    key={upgrade.id}
                    upgrade={upgrade}
                    onBuy={() => handleBuyUpgrade(upgrade.id)}
                    currentCookies={cookies}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4 text-yellow-300 text-center sticky top-0 bg-gray-800 bg-opacity-80 py-2 z-10">Click Power Upgrades</h2>
              <div className="space-y-3">
                {clickUpgrades.map(upgrade => (
                  <UpgradeCard
                    key={upgrade.id}
                    upgrade={upgrade}
                    onBuy={() => handleBuyUpgrade(upgrade.id)}
                    currentCookies={cookies}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full max-w-5xl mt-8 text-center text-xs text-gray-500">
        <p>Total cookies baked (approx): {formatNumber(totalCookiesEarnedAllTime())}</p>
        <p>Tip: Your progress is saved automatically in your browser!</p>
      </footer>
    </div>
  );
};

export default App;