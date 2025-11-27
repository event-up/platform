"use client";
import { ProtectedRoute } from "@/components/protected-route";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ProtectedRoute>
  );
}
