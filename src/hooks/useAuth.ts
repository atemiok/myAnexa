import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../api/supa';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'employer' | 'employee';

interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  employerId?: string;
}

interface AuthState {
  user: User | null;
  role: UserRole | null;
  isLoading: boolean;
  error: Error | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    role: null,
    isLoading: true,
    error: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const { data: { session } } = await db.auth.getSession();
      if (session?.user?.id) {
        await fetchUserProfile(session.user.id);
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    }
    init();

    // Listen for auth changes
    const { data: { subscription } } = db.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      if (event === 'SIGNED_IN' && session?.user?.id) {
        await fetchUserProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setState({ user: null, role: null, isLoading: false, error: null });
        navigate('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await db
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setState({
        user: {
          id: userId,
          email: profile.email,
          role: profile.role,
          firstName: profile.firstName,
          lastName: profile.lastName,
          employerId: profile.employerId,
        },
        role: profile.role,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState({
        user: null,
        role: null,
        isLoading: false,
        error: err instanceof Error ? err : new Error('Failed to fetch user profile'),
      });
    }
  };

  const logout = async () => {
    try {
      const { error } = await db.auth.signOut();
      if (error) throw error;
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err : new Error('Logout failed'),
      }));
      throw err;
    }
  };

  const hasRole = (role: UserRole | UserRole[]) => {
    if (!state.user) return false;
    if (Array.isArray(role)) {
      return role.includes(state.user.role);
    }
    return state.user.role === role;
  };

  return {
    ...state,
    logout,
    hasRole,
  };
} 