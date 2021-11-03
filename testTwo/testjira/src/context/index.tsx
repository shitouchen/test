import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { QueryClientProvider, QueryClient } from "react-query";

// 将根目录的App进行包裹
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
};
