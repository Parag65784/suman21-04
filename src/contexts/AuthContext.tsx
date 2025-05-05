import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  const fetchUserRole = async (id: string) => {
    const { data, error } = await supabase
      .from('users') // ✅ Correct table name
      .select('role')
      .eq('id', id)
      .single();
  
    if (error) {
      console.error('Failed to fetch role:', error.message);
      setUserRole(null);
    } else {
      setUserRole(data?.role ?? null);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) fetchUserRole(currentUser.id);
      setLoading(false);
    });
  
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) fetchUserRole(currentUser.id);
      else setUserRole(null);
      setLoading(false);
    });
  
    return () => subscription.unsubscribe();
  }, []);
  

  const signUp = async (email: string, password: string, name: string): Promise<void> => {
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
  
    if (authError) throw authError;
  
    const userId = data?.user?.id;
    if (!userId) throw new Error("User ID missing");
  
    const now = new Date().toISOString();
  
    const { error: dbError } = await supabase.from('users').insert([{
      id: userId,
      name,
      email,
      balance: 0,
      wallet_address: '',
      created_at: now,
      updated_at: now,
    }]);
  
    if (dbError) throw dbError;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, signIn, signUp, signOut }}>
      {!loading && children}
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