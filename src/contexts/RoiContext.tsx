import React, { createContext, useContext, useEffect, useState } from 'react';

export interface RoiSettings {
  defaultInvestment: number;
  rentalYield: number;
  appreciation: number;
  holdingPeriod: number;
  rentGrowth: number;
  expenseRatio: number;
  exitCosts: number;
}

export interface RoiScenario {
  id: string;
  name: string;
  rentalYieldDelta: number;
  appreciationDelta: number;
  holdingPeriodDelta: number;
  notes?: string;
}

interface RoiContextType {
  settings: RoiSettings;
  scenarios: RoiScenario[];
  updateSettings: (settings: RoiSettings) => void;
  updateScenario: (id: string, scenario: RoiScenario) => void;
  addScenario: (scenario: Omit<RoiScenario, 'id'>) => void;
  deleteScenario: (id: string) => void;
}

const DEFAULT_SETTINGS: RoiSettings = {
  defaultInvestment: 2500000,
  rentalYield: 0.09,
  appreciation: 0.07,
  holdingPeriod: 5,
  rentGrowth: 0.03,
  expenseRatio: 0.18,
  exitCosts: 0.02,
};

const DEFAULT_SCENARIOS: RoiScenario[] = [
  {
    id: 'scenario-balanced',
    name: 'Balanced Case',
    rentalYieldDelta: 0,
    appreciationDelta: 0,
    holdingPeriodDelta: 0,
    notes: 'Baseline assumptions for stabilized Grade-A assets.',
  },
  {
    id: 'scenario-growth',
    name: 'Growth Market',
    rentalYieldDelta: -0.01,
    appreciationDelta: 0.03,
    holdingPeriodDelta: 1,
    notes: 'Lower entry yield but higher appreciation in emerging corridors.',
  },
  {
    id: 'scenario-income',
    name: 'Income Focus',
    rentalYieldDelta: 0.015,
    appreciationDelta: -0.02,
    holdingPeriodDelta: -1,
    notes: 'Stabilized assets with long WALE prioritising cash yield.',
  },
];

const STORAGE_KEY = 'truassets_roi_settings';

const RoiContext = createContext<RoiContextType | undefined>(undefined);

export const RoiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<RoiSettings>(DEFAULT_SETTINGS);
  const [scenarios, setScenarios] = useState<RoiScenario[]>(DEFAULT_SCENARIOS);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.settings) setSettings(parsed.settings);
        if (Array.isArray(parsed.scenarios)) setScenarios(parsed.scenarios);
      } catch (error) {
        console.error('Error parsing stored ROI settings:', error);
      }
    } else {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ settings: DEFAULT_SETTINGS, scenarios: DEFAULT_SCENARIOS }),
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ settings, scenarios }));
  }, [settings, scenarios]);

  const updateSettings: RoiContextType['updateSettings'] = (nextSettings) => {
    setSettings(nextSettings);
  };

  const updateScenario: RoiContextType['updateScenario'] = (id, nextScenario) => {
    setScenarios((prev) => prev.map((scenario) => (scenario.id === id ? nextScenario : scenario)));
  };

  const addScenario: RoiContextType['addScenario'] = (scenario) => {
    setScenarios((prev) => [
      ...prev,
      {
        ...scenario,
        id: `scenario-${Date.now()}`,
      },
    ]);
  };

  const deleteScenario: RoiContextType['deleteScenario'] = (id) => {
    setScenarios((prev) => prev.filter((scenario) => scenario.id !== id));
  };

  const value: RoiContextType = {
    settings,
    scenarios,
    updateSettings,
    updateScenario,
    addScenario,
    deleteScenario,
  };

  return <RoiContext.Provider value={value}>{children}</RoiContext.Provider>;
};

export const useRoi = () => {
  const context = useContext(RoiContext);
  if (!context) {
    throw new Error('useRoi must be used within a RoiProvider');
  }
  return context;
};


