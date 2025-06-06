import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { db } from '../api/supa';

interface AuthContextType {
  user: User | null;
  role: string | null;
  companyId: string | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    db.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Fetch user metadata for role and companyId
        const { role, company_id } = session.user.user_metadata;
        setRole(role);
        setCompanyId(company_id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = db.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { role, company_id } = session.user.user_metadata;
        setRole(role);
        setCompanyId(company_id);
      } else {
        setRole(null);
        setCompanyId(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    const { error } = await db.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, role, companyId, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 