"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { retryQuery } from "@/src/shared/api/queryRetry";
import {
  hasSession,
  subscribeTokenChange,
} from "@/src/shared/lib/tokenStorage";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({ defaultOptions: { queries: { retry: retryQuery } } }),
  );

  useEffect(
    () =>
      subscribeTokenChange(() => {
        if (!hasSession()) queryClient.clear();
      }),
    [queryClient],
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
