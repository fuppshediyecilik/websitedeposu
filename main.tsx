import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import { logger } from "./lib/logger";
import { initializeSentry } from "./lib/sentry";
import "./index.css";

// Initialize Sentry early
initializeSentry();

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    logger.error("tRPC Query Error", error as Error, {
      type: "query_error",
      queryKey: (event.query.queryKey as any[])?.[0],
    });
    // Add breadcrumb to Sentry
    logger.addSentryBreadcrumb(`Query error: ${(event.query.queryKey as any[])?.[0]}`, "trpc");
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    logger.error("tRPC Mutation Error", error as Error, {
      type: "mutation_error",
    });
    // Add breadcrumb to Sentry
    logger.addSentryBreadcrumb("Mutation error occurred", "trpc");
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        const startTime = performance.now();
        const urlStr = typeof input === "string" ? input : input.toString();
        
        logger.logApiRequest("POST", urlStr);
        
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        }).then(response => {
          const duration = Math.round(performance.now() - startTime);
          logger.logApiResponse("POST", urlStr, response.status, duration);
          return response;
        }).catch(error => {
          const duration = Math.round(performance.now() - startTime);
          logger.error("tRPC Fetch Error", error, {
            url: urlStr,
            duration,
          });
          // Add breadcrumb to Sentry
          logger.addSentryBreadcrumb(`Fetch error: ${urlStr} (${duration}ms)`, "network");
          throw error;
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
