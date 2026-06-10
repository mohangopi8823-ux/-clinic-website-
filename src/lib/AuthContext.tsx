import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from './supabase';
import type { AdminUser } from './supabase';

interface AuthContextType {
  isAdmin: boolean;
  adminUser: AdminUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error('Error loading admin session:', error);
        setAdminUser(null);
        setIsAdmin(false);
      } else if (data.session?.user) {
        const user = data.session.user;
        setAdminUser({
          id: user.id,
          email: user.email || '',
          role: 'admin',
          created_at: user.created_at,
        });
        setIsAdmin(true);
      } else {
        setAdminUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const user = session.user;
        setAdminUser({
          id: user.id,
          email: user.email || '',
          role: 'admin',
          created_at: user.created_at,
        });
        setIsAdmin(true);
      } else {
        setAdminUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error || !data.user) {
      console.error('Admin login failed:', error);
      return { success: false, error: error?.message || 'Invalid credentials' };
    }

    const user: AdminUser = {
      id: data.user.id,
      email: data.user.email || email.trim(),
      role: 'admin',
      created_at: data.user.created_at,
    };

    setAdminUser(user);
    setIsAdmin(true);
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, adminUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
