"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import {
  onAuthStateChange,
  signInWithGoogle as firebaseSignInWithGoogle,
  signOut as firebaseSignOut,
} from "@workspace/firebase/auth";
import { createOrganizer } from "@workspace/database/organizer/post";
import { getOrganizer } from "@workspace/database/organizer/get";
import { UserRole } from "@workspace/models/db/user";
import { NotFoundError } from "@workspace/utils/src/errors/database";
import { Button } from "@workspace/ui/components/button";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const user = await firebaseSignInWithGoogle();

      // Check if organizer document exists, if not create one
      try {
        await getOrganizer(user.uid);
        console.log("Organizer document already exists");
      } catch (error) {
        // Organizer doesn't exist, create new one
        if (error instanceof NotFoundError) {
          console.log("Creating new organizer document");
          await createOrganizer({
            userId: user.uid,
            email: user.email || "",
            role: UserRole.ORGANIZER,
            profileImgUrl: user.photoURL || "",
          });
          console.log("Organizer document created successfully");
        }
      }
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Unauthorized


      <Button onClick={signInWithGoogle}>Sign In with Google</Button>
    </div>;
  }

  if (!user || loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
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
