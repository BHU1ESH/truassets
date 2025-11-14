import React, { createContext, useContext, useEffect, useState } from 'react';

export type LeadStatus = 'new' | 'in-progress' | 'contacted' | 'converted' | 'archived';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  investmentHorizon: string;
  investmentGoal: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  source: string;
  status: LeadStatus;
  createdAt: string;
}

interface LeadContextType {
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'status' | 'createdAt'> & { status?: LeadStatus }) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  setLeadStatus: (id: string, status: LeadStatus) => void;
  getLeadStats: () => {
    total: number;
    new: number;
    contacted: number;
    converted: number;
    archived: number;
  };
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

const STORAGE_KEY = 'truassets_leads';

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const storedLeads = localStorage.getItem(STORAGE_KEY);
    if (storedLeads) {
      try {
        setLeads(JSON.parse(storedLeads));
      } catch (error) {
        console.error('Error parsing stored leads:', error);
        setLeads([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  const addLead: LeadContextType['addLead'] = (leadData) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: leadData.status ?? 'new',
      createdAt: new Date().toISOString(),
    };

    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLead: LeadContextType['updateLead'] = (id, updates) => {
    setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead)));
  };

  const deleteLead: LeadContextType['deleteLead'] = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const setLeadStatus: LeadContextType['setLeadStatus'] = (id, status) => {
    updateLead(id, { status });
  };

  const getLeadStats: LeadContextType['getLeadStats'] = () => {
    return {
      total: leads.length,
      new: leads.filter((lead) => lead.status === 'new').length,
      contacted: leads.filter((lead) => lead.status === 'contacted').length,
      converted: leads.filter((lead) => lead.status === 'converted').length,
      archived: leads.filter((lead) => lead.status === 'archived').length,
    };
  };

  const value: LeadContextType = {
    leads,
    addLead,
    updateLead,
    deleteLead,
    setLeadStatus,
    getLeadStats,
  };

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};


