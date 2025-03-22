import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { Outlet } from "react-router-dom";

export const Providers = () => (
  <QueryClientProvider client={queryClient}>
    <Outlet />
  </QueryClientProvider>
);
