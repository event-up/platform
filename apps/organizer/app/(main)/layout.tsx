"use client";
import { ProtectedRoute } from "@/components/protected-route";
import { AuthProvider } from "@/lib/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ProtectedRoute>
    </AuthProvider>
  );
}
