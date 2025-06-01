import React, { createContext, useContext, useEffect, useState } from 'react';

interface Company {
  id: string;
  name: string;
  // Add other company fields as needed
}

interface CompanyContextType {
  company: Company | null;
  setCompany: (company: Company | null) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

const STORAGE_KEY = 'myanexa_company';

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [company, setCompanyState] = useState<Company | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const setCompany = (newCompany: Company | null) => {
    setCompanyState(newCompany);
    if (newCompany) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCompany));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setCompanyState(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
} 