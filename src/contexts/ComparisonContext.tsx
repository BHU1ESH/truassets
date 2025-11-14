import React, { createContext, useContext, useEffect, useState } from 'react';

interface ComparisonContextType {
  selectedIds: string[];
  toggleProperty: (id: string) => void;
  removeProperty: (id: string) => void;
  clearAll: () => void;
  isSelected: (id: string) => boolean;
}

const MAX_PROPERTIES = 4;
const STORAGE_KEY = 'truassets_property_comparison';

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSelectedIds(parsed);
        }
      } catch (error) {
        console.error('Error parsing comparison selections:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
  }, [selectedIds]);

  const toggleProperty: ComparisonContextType['toggleProperty'] = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= MAX_PROPERTIES) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const removeProperty: ComparisonContextType['removeProperty'] = (id) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const clearAll: ComparisonContextType['clearAll'] = () => {
    setSelectedIds([]);
  };

  const value: ComparisonContextType = {
    selectedIds,
    toggleProperty,
    removeProperty,
    clearAll,
    isSelected: (id: string) => selectedIds.includes(id),
  };

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};


