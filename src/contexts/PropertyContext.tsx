import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Property {
  id: string;
  title: string;
  location: string;
  type: string;
  price: number;
  targetAmount: number;
  raisedAmount: number;
  investors: number;
  expectedReturn: number;
  tenure: string;
  image: string;
  description: string;
  amenities: string[];
  status: 'active' | 'funded' | 'upcoming';
  createdAt: string;
}

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getStatistics: () => {
    totalProperties: number;
    activeInvestors: number;
    totalInvestment: number;
    avgReturns: number;
  };
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);

  // Load properties from localStorage on mount
  useEffect(() => {
    const storedProperties = localStorage.getItem('truassets_properties');
    if (storedProperties) {
      try {
        setProperties(JSON.parse(storedProperties));
      } catch (error) {
        console.error('Error parsing stored properties:', error);
        localStorage.removeItem('truassets_properties');
      }
    }
  }, []);

  // Save properties to localStorage whenever they change
  useEffect(() => {
    if (properties.length > 0) {
      localStorage.setItem('truassets_properties', JSON.stringify(properties));
    }
  }, [properties]);

  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: 'prop-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setProperties((prev) => [newProperty, ...prev]);
  };

  const updateProperty = (id: string, propertyData: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((prop) => (prop.id === id ? { ...prop, ...propertyData } : prop))
    );
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((prop) => prop.id !== id));
  };

  const getStatistics = () => {
    const totalProperties = properties.length;
    const activeInvestors = properties.reduce((sum, prop) => sum + prop.investors, 0);
    const totalInvestment = properties.reduce((sum, prop) => sum + prop.raisedAmount, 0);
    const avgReturns = properties.length > 0
      ? properties.reduce((sum, prop) => sum + prop.expectedReturn, 0) / properties.length
      : 0;

    return {
      totalProperties,
      activeInvestors,
      totalInvestment,
      avgReturns,
    };
  };

  const value: PropertyContextType = {
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    getStatistics,
  };

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
