"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { RegistrationForm } from "@workspace/models/db/registration-form";

type RegistrationContextValue = {
  domain: string;
};

type RegistrationProviderProps = {
  domain: string;
  children: ReactNode;
};

const RegistrationContext = createContext<RegistrationContextValue | undefined>(
  undefined
);

export function RegistrationProvider({
  domain,
  children,
}: RegistrationProviderProps) {
  if (!domain) {
    throw new Error("RegistrationProvider requires a domain");
  }

  const value = useMemo(() => ({ domain }), [domain]);

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistrationContext() {
  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error(
      "useRegistrationContext must be used within RegistrationProvider"
    );
  }

  return context;
}
