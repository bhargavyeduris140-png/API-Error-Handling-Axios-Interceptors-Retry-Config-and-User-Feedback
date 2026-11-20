import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry once after the initial failure.
      retry: 1,
      // Exponential backoff, capped at 30 seconds.
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    },
  },
});
