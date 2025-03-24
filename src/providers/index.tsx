import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"

export const Providers = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster position="top-center" richColors />
    <Outlet />
  </QueryClientProvider>
);
