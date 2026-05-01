"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { onAuthStateChange } from "@workspace/firebase/auth";
import { verifySession } from "@/actions/auth-actions";
import { signOut as organizerSignOut } from "@/lib/auth-service";
interface AuthContextType {
  user: User;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      console.log("onAuthStateChange :: ", { user });

      setUser(user);
      setLoading(false);
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    verifySession().then(({ valid }) => {
      if (!valid) organizerSignOut();
    });
  }, [user]);

  const signOut = async () => {
    try {
      setLoading(true);
      await organizerSignOut();
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
